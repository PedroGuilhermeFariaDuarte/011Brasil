export interface People {
  nome: string
  idade: number
  areaDeAtuacao: string
}

export interface GroupsOfPeople {
  groupOne: Array<People>,
  groupTwo: Array<People>,
  groupThree: Array<People>,
  groupFor: Array<People>
}