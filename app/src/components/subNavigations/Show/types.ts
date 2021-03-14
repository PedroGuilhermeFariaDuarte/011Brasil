import { PropsWithChildren } from "react"

export interface IMyMessage extends PropsWithChildren<any> { }

export interface IProduct {
	_id: string
	march: string
	model: string
	year: number
	manufacturing: string
	plate: string
	__v?: number
}
