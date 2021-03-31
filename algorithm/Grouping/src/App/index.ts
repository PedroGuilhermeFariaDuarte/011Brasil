import * as fs from "fs/promises"
import { resolve } from "path"

// Data
import Data from '../data/index.json'

// Logger
import Logger from '../config/Log'

// Types
import { GroupsOfPeople, People } from "./types"

class Algorithm {

  #people: Array<People> = Data.pessoas || []
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
    this.setLog(`Length of data: ${this.#people?.length || 0}`, 'info')
    this.setLog(`Total of groups: ${this.#total_of_groups || 0}`, 'info')
    this.setLog(`Total of peoples per group: ${this.#total_people_per_group || 0}`, 'info')

    if (this.#people.length <= 0) {
      return Promise.all(
        [
          this.setLog("I don't have any data! Please open the 'data' folder and create a file called 'index.json'", "warn")
        ]
      )
    }

    return Promise.all([
      this.initializeGrouping(),
      this.initializeReGrouping(),
      this.setSaveNewFile()
    ])
  }

  // Ordering of items in groups
  initializeGrouping(): void {
    this.setLog("----Initializing Grouping----", "info")

    let total_iteration = 0;
    let total_people_added = 0;
    for (let i = 0; i < this.#people.length; i++) {
      total_iteration++
      if (this.#people[ i ].areaDeAtuacao.match(this.#regex_condition) !== null) {
        if (this.addOnGroup(this.#people[ i ])) total_people_added++
      } else {
        //this.setLog(`People ${this.#people[ i ].nome}, the area '${this.#people[ i ].areaDeAtuacao}' is not priority`,'warn')
      }
    }
    this.setLog(`Total of iteration: ${total_iteration}`, 'info')
    this.setLog(`Total of people added: ${total_people_added}`, 'info')
    this.setLog(`Total of people who were not added: ${total_iteration - total_people_added}`, 'info')
    this.setLog("----Grouping was finished----", 'info')
  }

  // Parsial Ordering of all items per age
  initializeOrderingOfGroups(): Array<any> {
    this.setLog("----Initializing Ordering of groups----", "info")

    const groups = new Map()
    groups.set("groups", this.#groups)

    const orderingGroup: Array<GroupsOfPeople> = []

    for (let i = 0; i < this.#list_of_groups.length; i++) {
      const actualGroup = groups.get("groups")[ this.#list_of_groups[ i ] ]
      //this.setLog(`Actual group is ordering: ${this.#list_of_groups[ i ]}`)

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

      //this.setLog(`Actual ordering of group was finished: ${this.#list_of_groups[ i ]}`)
      orderingGroup.push(actualGroup)
    }

    groups.set("groups", orderingGroup)
    this.setLog("----Ordering of groups was finished----", "info")
    return Array.from(groups.get("groups").values())
  }

  // Re-grouping of items in groups
  initializeReGrouping(): void {
    this.setLog("----Initializing Re-grouping----", "info")
    const ordened_groups: Array<any> = this.initializeOrderingOfGroups()
    for (let i = 0; i < this.#list_of_groups.length; i++) {
      // @ts-ignore
      this.#groups[ `${this.#list_of_groups[ i ]}` ] = ordened_groups[ i ]
    }

    this.setLog("----Re-grouping was finished----", "info")
  }

  // Added a item in a group
  addOnGroup(people: People): boolean {

    if (
      people.idade > this.#age_of_people
      &&
      this.#groups.groupOne.length < this.#total_people_per_group) {
      //setLogPeople(people.nome, people.areaDeAtuacao, 'Added in group 1')
      this.#groups.groupOne.push(people)
    } else {
      if (this.#groups.groupOne.length < this.#total_people_per_group) {
        //setLogPeople(people.nome, people.areaDeAtuacao, 'Added in group 1')
        this.#groups.groupOne.push(people)
      } else if (this.#groups.groupTwo.length < this.#total_people_per_group) {
        //setLogPeople(people.nome, people.areaDeAtuacao, 'Added in group 2')
        this.#groups.groupTwo.push(people)

      } else if (this.#groups.groupThree.length < this.#total_people_per_group) {
        //setLogPeople(people.nome, people.areaDeAtuacao, 'Added in group 3')
        this.#groups.groupThree.push(people)

      } else if (this.#groups.groupFor.length < this.#total_people_per_group) {
        //setLogPeople(people.nome, people.areaDeAtuacao, 'Added in group 4')
        this.#groups.groupFor.push(people)

      } else {
        this.setLog(`Dont not possible added the people ${people.nome}  in a group, all groups is full`, 'warn')
        return false
      }
    }

    return true
  }

  // Save o resul in a json file
  async setSaveNewFile() {
    this.setLog("----Initializing saving of result on file----", "info")
    try {
      const pathStream = await fs.opendir(resolve(__dirname, "..") + "/data")
      fs.writeFile(`${pathStream.path}/result.json`, JSON.stringify(this.#groups))
        .then(_resolve => this.setLog("----Saving of file was finished----", "info"))
        .catch(error => this.setLog(`Have a error: ${error.message}`, "error"))
    } catch (error) {
      this.setLog(`Have a error: ${error.message}`, 'error')
    }
  }

  // Show log's of people
  setLogPeople(name: string, area: string, description: string): void {
    Logger.info(`People: ${name} - Area: ${area}, ${description}`)
  }

  // Show log's
  setLog(message: string, level: string): void {
    Logger[ level ](message)
  }
}

export default Algorithm