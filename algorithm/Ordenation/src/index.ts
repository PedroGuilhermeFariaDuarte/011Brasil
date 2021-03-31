import * as fs from "fs/promises"
import { resolve } from "path"

// Data
import Data from './data/index.json'

// Logger
import Logger from './config/Log'

// Types
import { GroupsOfPeople, People } from "./types"

const PEOPLE: Array<People> = Data.pessoas
const AGE_OF_PEOPLE: number = 60
const TOTAL_OF_GROUPS: number = 4
const TOTAL_PEOPLE_PER_GROUP: number = (PEOPLE?.length === 0 || PEOPLE?.length < 0 ? 20 : PEOPLE?.length) / TOTAL_OF_GROUPS
const GROUPS: GroupsOfPeople = {
  groupOne: [],
  groupTwo: [],
  groupThree: [],
  groupFor: []
}
const LIST_OF_GROUPS = [
  "groupOne",
  "groupTwo",
  "groupThree",
  "groupFor"
]

const REGEX_CONDITION = /Saúde|Educação|Alimentícios|Segurança/i

Logger.info(`Length of data: ${PEOPLE?.length || 0}`)
Logger.info(`Total of groups: ${TOTAL_OF_GROUPS || 0}`)
Logger.info(`Total of peoples per group: ${TOTAL_PEOPLE_PER_GROUP || 0}`)

// Ordering of items in groups
function initializeGrouping(): void {
  Logger.info("----Initializing Grouping----")

  let total_iteration = 0;
  let total_people_added = 0;
  for (let i = 0; i < PEOPLE.length; i++) {
    total_iteration++
    if (PEOPLE[ i ].areaDeAtuacao.match(REGEX_CONDITION) !== null) {
      if (addOnGroup(PEOPLE[ i ])) total_people_added++
    } else {
      //Logger.info(`People ${PEOPLE[ i ].nome}, the area '${PEOPLE[ i ].areaDeAtuacao}' is not priority`)
    }
  }
  Logger.info(`Total of iteration: ${total_iteration}`)
  Logger.info(`Total of people added: ${total_people_added}`)
  Logger.info(`Total of people who were not added: ${total_iteration - total_people_added}`)
  Logger.info("----Grouping was finished----")
}

// Parsial Ordering of all items per age
function initializeOrderingOfGroups(): Array<any> {
  Logger.info("----Initializing Ordering of groups----")

  const groups = new Map()
  groups.set("groups", GROUPS)

  const orderingGroup: Array<GroupsOfPeople> = []

  for (let i = 0; i < LIST_OF_GROUPS.length; i++) {
    const actualGroup = groups.get("groups")[ LIST_OF_GROUPS[ i ] ]
    //Logger.info(`Actual group is ordering: ${LIST_OF_GROUPS[ i ]}`)

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

    //Logger.info(`Actual ordering of group was finished: ${LIST_OF_GROUPS[ i ]}`)
    orderingGroup.push(actualGroup)
  }

  groups.set("groups", orderingGroup)
  Logger.info("----Ordering of groups was finished----")
  return Array.from(groups.get("groups").values())
}

// Re-grouping of items in groups
function initializeReGrouping(): void {
  Logger.info("----Initializing Re-grouping----")
  const ordened_groups: Array<any> = initializeOrderingOfGroups()
  for (let i = 0; i < LIST_OF_GROUPS.length; i++) {
    // @ts-ignore
    GROUPS[ `${LIST_OF_GROUPS[ i ]}` ] = ordened_groups[ i ]
  }

  Logger.info("----Re-grouping was finished----")
}

// Added a item in a group
function addOnGroup(people: People): boolean {

  if (people.idade > AGE_OF_PEOPLE) {
    if (GROUPS.groupOne.length < TOTAL_PEOPLE_PER_GROUP) {
      //setLogger(people.nome, people.areaDeAtuacao, 'Added in group 1')
      GROUPS.groupOne.push(people)
    }
  } else {
    if (GROUPS.groupTwo.length < TOTAL_PEOPLE_PER_GROUP) {
      //setLogger(people.nome, people.areaDeAtuacao, 'Added in group 2')
      GROUPS.groupTwo.push(people)

    } else if (GROUPS.groupThree.length < TOTAL_PEOPLE_PER_GROUP) {
      //setLogger(people.nome, people.areaDeAtuacao, 'Added in group 3')
      GROUPS.groupThree.push(people)

    } else if (GROUPS.groupFor.length < TOTAL_PEOPLE_PER_GROUP) {
      //setLogger(people.nome, people.areaDeAtuacao, 'Added in group 4')
      GROUPS.groupFor.push(people)

    } else {
      Logger.info(`Dont not possible added the people ${people.nome}  in a group, all groups is full`)
      return false
    }
  }

  return true
}

// Save o resul in a json file
async function setSaveNewFile() {
  Logger.info("----Initializing saving of result on file----")
  try {
    const pathStream = await fs.opendir(resolve(__dirname) + "/data")
    fs.writeFile(`${pathStream.path}/result.json`, JSON.stringify(GROUPS))
      .then(_resolve => Logger.info("----Saving of file was finished----"))
      .catch(error => Logger.error(`Have a error: ${error.message}`))
  } catch (error) {
    Logger.error(`Have a error: ${error.message}`)
  }
}

// Show log's 
function setLogger(name: string, area: string, description: string): void {
  Logger.info(`People: ${name} - Area: ${area}, ${description}`)
}

// Initialize of the Algorithm
Promise.all([
  initializeGrouping(),
  initializeReGrouping(),
  setSaveNewFile()
])
  .then(_resolve => {
    Logger.info("----Algorithm was finished----")
    Logger.info(`----Check out the folder ${resolve(__dirname) + '/data'} and open the file 'result.json'----`)
  })
  .catch(reject => {
    Logger.error(`Have a error: ${reject.message}`)
  })
