import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { NotAuthorizedError } from "./error-handler"

const token: string[] = ['auth','seller','gig','search','buyer','message','order','review']

export function verifyGatewayRequest(req:Request, res:Response, next:NextFunction):void{
    if(!req.headers?.gatewayToken){
        throw new NotAuthorizedError('Invalid tokne','verifyGatewayRequest():Rquest not coming')
    }
    const token:string = req.headers?.gatewayToken as string
    if(!token){
        throw new NotAuthorizedError('No tokne','verifyGatewayRequest():No token')
    }
    try {
        const decoded = jwt.verify(token,'') as JwtPayload
        if(!decoded){
            throw new NotAuthorizedError('No tokne','verifyGatewayRequest():No token')
        }
        if(!token.includes(decoded.id)){
            throw new NotAuthorizedError('Invalid Token','verifyGatewayRequest():Invalid token')
        }
        next()
    } catch (error) {
        throw new NotAuthorizedError('Invalid tokne','verifyGatewayRequest():Rquest not coming')
    }
}