import { Match, Goal, Group } from 'entities'
import { getEntityManager, getRepository } from 'common/utils/orm'
import { NextApiResponse } from 'next'
import { successResponse } from 'common/utils/api'
import { errorResponse } from 'common/utils/api'
import { ExtendedRequest } from 'common/utils/next-connect'
import { PopulateHint, wrap } from '@mikro-orm/core'

export const registerGoal = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { athleteId, matchId, teamId, goals } = req.body

  const matchRepository = getRepository(Match)
  const match = await matchRepository.findOne(
    {
      id: matchId,
    },
    {
      populate: [`statisticTeamA`, `statisticTeamB`, `group`],
      populateWhere: PopulateHint.INFER,
    },
  )

  if (match == null) {
    errorResponse(res, `No se encontró el partido con el id ${matchId}`)
    return
  }

  const em = getEntityManager()

  const isTeamA = match.teamA.id === teamId
  let matchRef = em.getReference(Match, match.id)
  if (isTeamA) {
    if (match.statisticTeamA == null) {
      wrap(matchRef).assign({
        statisticTeamA: {
          goals: [],
          team: teamId,
          points: 0,
          average: 0,
        },
      })
      await em.persistAndFlush(matchRef)
    }
    em.create(Goal, {
      goals: goals as unknown as number,
      athlete: athleteId as string,
      statistic: match.statisticTeamA!,
    })
    await em.flush()
    matchRef = em.getReference(Match, match.id)
    await em.populate(matchRef, [
      `statisticTeamA`,
      `statisticTeamA.goals`,
      `statisticTeamB`,
      `statisticTeamB.goals`,
      `group`,
    ])

    const goalsCount =
      matchRef.statisticTeamA?.goals
        .getItems()
        .reduce((acc, goal) => acc + goal.goals, 0) ||
      0 ||
      0
    const goalsAgainst =
      matchRef.statisticTeamB?.goals
        .getItems()
        .reduce((acc, goal) => acc + goal.goals, 0) ||
      0 ||
      0

    wrap(matchRef.statisticTeamA).assign({
      goalsInFavor: goalsCount,
      goalsAgainst,
      difference: goalsCount - goalsAgainst,
    })

    if (matchRef.statisticTeamB) {
      wrap(matchRef.statisticTeamB).assign({
        goalsInFavor: goalsAgainst,
        goalsAgainst: goalsCount,
        difference: goalsAgainst - goalsCount,
      })
    }

    await em.persistAndFlush(matchRef)

    const groupRepository = getRepository(Group)
    const group = await groupRepository.findOne(
      {
        id: match.group.id,
      },
      {
        populate: [
          `teams`,
          `teams.athletes`,
          `category`,
          `matches`,
          `matches.teamA`,
          `matches.teamB`,
          `matches.statisticTeamA`,
          `matches.statisticTeamA.goals`,
          `matches.statisticTeamB`,
          `matches.statisticTeamB.goals`,
        ],
        populateWhere: PopulateHint.INFER,
      },
    )

    successResponse(res, group)
    return
  }

  if (match.statisticTeamB == null) {
    wrap(matchRef).assign({
      statisticTeamB: {
        goals: [],
        team: teamId,
        points: 0,
        average: 0,
      },
    })
    await em.persistAndFlush(matchRef)
  }
  em.create(Goal, {
    goals: goals as unknown as number,
    athlete: athleteId as string,
    statistic: match.statisticTeamB!,
  })
  await em.flush()

  matchRef = em.getReference(Match, match.id)
  await em.populate(matchRef, [
    `statisticTeamA`,
    `statisticTeamA.goals`,
    `statisticTeamB`,
    `statisticTeamB.goals`,
    `group`,
  ])

  const goalsCount =
    matchRef.statisticTeamB?.goals
      .getItems()
      .reduce((acc, goal) => acc + goal.goals, 0) || 0
  const goalsAgainst =
    matchRef.statisticTeamA?.goals
      .getItems()
      .reduce((acc, goal) => acc + goal.goals, 0) ||
    0 ||
    0

  wrap(matchRef.statisticTeamB).assign({
    goalsInFavor: goalsCount,
    goalsAgainst,
    difference: goalsCount - goalsAgainst,
  })
  if (matchRef.statisticTeamA) {
    wrap(matchRef.statisticTeamA).assign({
      goalsInFavor: goalsAgainst,
      goalsAgainst: goalsCount,
      difference: goalsAgainst - goalsCount,
    })
  }

  await em.persistAndFlush(matchRef)

  const groupRepository = getRepository(Group)
  const group = await groupRepository.findOne(
    {
      id: match.group.id,
    },
    {
      populate: [
        `teams`,
        `teams.athletes`,
        `category`,
        `matches`,
        `matches.teamA`,
        `matches.teamB`,
        `matches.statisticTeamA`,
        `matches.statisticTeamA.goals`,
        `matches.statisticTeamA.goals.athlete`,
        `matches.statisticTeamB`,
        `matches.statisticTeamB.goals`,
        `matches.statisticTeamB.goals.athlete`,
      ],
      populateWhere: PopulateHint.INFER,
    },
  )

  successResponse(res, group)
}
