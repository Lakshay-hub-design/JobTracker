const Session = require('../models/session.model')

class SessionRepository {

    async createSession(sessionData) {
        return await Session.create(sessionData)
    }   

    async findSessionByRefreshTokenHash(refreshTokenHash) {
        return await Session.findOne({ 
            refreshTokenHash,
            revoked: false
        })
    }

    async revokeSession(session) {
        session.revoked = true
        return session.save()
    }

    async updateSession(session, data) {
        Object.assign(session, data)
        return session.save()
    }

    async revokeAllSessions(userId) {
        return Session.updateMany(
            { user: userId, revoked: false },
            { revoked: true }
        )
    }

}

module.exports = new SessionRepository()