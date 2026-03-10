import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { NotAuthorizedError } from "./error-handler"

const tokens: string[] = ['auth','seller','gig','search','buyer','message','order','review']

export function verifyGatewayRequest(req:Request, _res:Response, next:NextFunction):void{
    if(!req.headers?.gatewaytoken){
        throw new NotAuthorizedError('Invalid tokne','verifyGatewayRequest():Rquest not coming')
    }
    const token:string = req.headers?.gatewaytoken as string
    if(!token){
        throw new NotAuthorizedError('No tokne','verifyGatewayRequest():No token')
    }
    try {
        const decoded: {id: string, iat: number} = jwt.verify(token,'DSJFAJSDOFP382238T920IODSAJoifaoshjtqwas') as {id: string, iat: number}
        if(!decoded){
            throw new NotAuthorizedError('No tokne','verifyGatewayRequest():No token')
        }
        if(!tokens.includes(decoded.id)){
            throw new NotAuthorizedError('Invalid Token','verifyGatewayRequest():Invalid token')
        }
        
    } catch (error) {
        throw new NotAuthorizedError('Invalid tokne','verifyGatewayRequest():Rquest not coming')
    }
    next()
}