import * as fs from "fs/promises"
import { resolve } from "path"

// Data
import Data from '../data/index.json'

// Logger
import Logger from '../config/Log'

// Types
import { GroupsOfPeople, People } from "./types"

class Algorithm {

  #people: Array<People> = Data.pessoas
  #age_of_people: number = 60
  #total_of_groups: number = 4
  #total_people_per_group: number = (this.#people?.length === 0 || this.#people?.length < 0 ? 20 : this.#people?.length) / this.#total_of_groups
  #groups: GroupsOfPeople = {
    groupOne: [],
    groupTwo: [],
    groupThree: [],
    groupFor: []
  }
  #list_of_groups = [
    "groupOne",
    "groupTwo",
    "groupThree",
    "groupFor"
  ]
  #regex_condition = /Saúde|Educação|Alimentícios|Segurança/i

  constructor(people: Array<People> = Data.pessoas,
    age_of_people: number = 60,
    total_of_groups: number = 4,
    total_people_per_group = 5,
    groups: GroupsOfPeople = {
      groupOne: [],
      groupTwo: [],
      groupThree: [],
      groupFor: []
    },
    list_of_groups: Array<any> = [
      "groupOne",
      "groupTwo",
      "groupThree",
      "groupFor"
    ],
    regex_condition: any = /Saúde|Educação|Alimentícios|Segurança/i
  ) {
    this.#people = people
    this.#age_of_people = age_of_people
    this.#total_of_groups = total_of_groups
    this.#total_people_per_group = (this.#people?.length === 0 || this.#people?.length < 0 ? 20 : this.#people?.length) / this.#total_of_groups
    this.#groups = groups
    this.#list_of_groups = list_of_groups
    this.#regex_condition = regex_condition
  }

  initialize() {
    Logger.info(`Length of data: ${this.#people?.length || 0}`)
    Logger.info(`Total of groups: ${this.#total_of_groups || 0}`)
    Logger.info(`Total of peoples per group: ${this.#total_people_per_group || 0}`)

    return Promise.all([
      this.initializeGrouping(),
      this.initializeReGrouping(),
      this.setSaveNewFile()
    ])
  }

  // Ordering of items in groups
  initializeGrouping(): void {
    Logger.info("----Initializing Grouping----")

    let total_iteration = 0;
    let total_people_added = 0;
    for (let i = 0; i < this.#people.length; i++) {
      total_iteration++
      if (this.#people[ i ].areaDeAtuacao.match(this.#regex_condition) !== null) {
        if (this.addOnGroup(this.#people[ i ])) total_people_added++
      } else {
        //Logger.info(`People ${this.#people[ i ].nome}, the area '${this.#people[ i ].areaDeAtuacao}' is not priority`)
      }
    }
    Logger.info(`Total of iteration: ${total_iteration}`)
    Logger.info(`Total of people added: ${total_people_added}`)
    Logger.info(`Total of people who were not added: ${total_iteration - total_people_added}`)
    Logger.info("----Grouping was finished----")
  }

  // Parsial Ordering of all items per age
  initializeOrderingOfGroups(): Array<any> {
    Logger.info("----Initializing Ordering of groups----")

    const groups = new Map()
    groups.set("groups", this.#groups)

    const orderingGroup: Array<GroupsOfPeople> = []

    for (let i = 0; i < this.#list_of_groups.length; i++) {
      const actualGroup = groups.get("groups")[ this.#list_of_groups[ i ] ]
      //Logger.info(`Actual group is ordering: ${this.#list_of_groups[ i ]}`)

      for (let j = 0; j < actualGroup.length; j++) {
        const actualIndex = j
        const replaceIndex = actualIndex + 2 - 1
        const actualPeople = actualGroup[ actualIndex ]
        const replacePeople = actualGroup[ replaceIndex ]

        if (actualPeople?.idade < replacePeople?.idade) {
          actualGroup[ actualIndex ] = replacePeople
          actualGroup[ replaceIndex ] = actualPeople
        }
      }

      //Logger.info(`Actual ordering of group was finished: ${this.#list_of_groups[ i ]}`)
      orderingGroup.push(actualGroup)
    }

    groups.set("groups", orderingGroup)
    Logger.info("----Ordering of groups was finished----")
    return Array.from(groups.get("groups").values())
  }

  // Re-grouping of items in groups
  initializeReGrouping(): void {
    Logger.info("----Initializing Re-grouping----")
    const ordened_groups: Array<any> = this.initializeOrderingOfGroups()
    for (let i = 0; i < this.#list_of_groups.length; i++) {
      // @ts-ignore
      this.#groups[ `${this.#list_of_groups[ i ]}` ] = ordened_groups[ i ]
    }

    Logger.info("----Re-grouping was finished----")
  }

  // Added a item in a group
  addOnGroup(people: People): boolean {

    if (people.idade > this.#age_of_people) {
      if (this.#groups.groupOne.length < this.#total_people_per_group) {
        //setLogger(people.nome, people.areaDeAtuacao, 'Added in group 1')
        this.#groups.groupOne.push(people)
      }
    } else {
      if (this.#groups.groupTwo.length < this.#total_people_per_group) {
        //setLogger(people.nome, people.areaDeAtuacao, 'Added in group 2')
        this.#groups.groupTwo.push(people)

      } else if (this.#groups.groupThree.length < this.#total_people_per_group) {
        //setLogger(people.nome, people.areaDeAtuacao, 'Added in group 3')
        this.#groups.groupThree.push(people)

      } else if (this.#groups.groupFor.length < this.#total_people_per_group) {
        //setLogger(people.nome, people.areaDeAtuacao, 'Added in group 4')
        this.#groups.groupFor.push(people)

      } else {
        Logger.info(`Dont not possible added the people ${people.nome}  in a group, all groups is full`)
        return false
      }
    }

    return true
  }

  // Save o resul in a json file
  async setSaveNewFile() {
    Logger.info("----Initializing saving of result on file----")
    try {
      const pathStream = await fs.opendir(resolve(__dirname, "..") + "/data")
      fs.writeFile(`${pathStream.path}/result.json`, JSON.stringify(this.#groups))
        .then(_resolve => Logger.info("----Saving of file was finished----"))
        .catch(error => Logger.error(`Have a error: ${error.message}`))
    } catch (error) {
      Logger.error(`Have a error: ${error.message}`)
    }
  }

  // Show log's 
  setLogger(name: string, area: string, description: string): void {
    Logger.info(`People: ${name} - Area: ${area}, ${description}`)
  }
}

export default Algorithm