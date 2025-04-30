import type { Event, User, UserPermission } from '@prisma/client'

type MaybeUser = Pick<User, 'permissions' | 'id'> | null
type MaybeEvent = Pick<Event, 'authorID'> | null

const hasPermission = (user: MaybeUser, permission: UserPermission) => {
  return user?.permissions.includes(permission) || user?.permissions.includes('ALL') || false
}

export const canBlockEvent = (user: MaybeUser) => {
  return hasPermission(user, 'BLOCK_EVENTS')
}

export const canEditEvent = (user: MaybeUser, event: MaybeEvent) => {
  return !!user && !!event && user?.id === event?.authorID
}
