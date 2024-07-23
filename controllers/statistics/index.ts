import { Match, Goal } from 'entities'
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
      populate: [`statisticTeamA`, `statisticTeamB`],
      populateWhere: PopulateHint.INFER,
    },
  )

  if (match == null) {
    errorResponse(res, `No se encontró el partido con el id ${matchId}`)
    return
  }

  const em = getEntityManager()

  const isTeamA = match.teamA.id === teamId
  const matchRef = em.getReference(Match, match.id)
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

    successResponse(res, {})
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

  successResponse(res, {})
}