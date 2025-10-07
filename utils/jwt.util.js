import jwt from 'jsonwebtoken'



export const generateJsonWebToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })
}

