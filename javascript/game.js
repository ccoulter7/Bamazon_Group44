const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')


let score = 0;
let attempts = 0;
let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function restart() {
  localStorage.setItem('score', score);
  score = 0;

  attempts = attempts + 1;
  localStorage.setItem('attempts', attempts);


  var timeTaken = document.getElementById('timerVar').innerHTML;
  localStorage.setItem('timeTaken', timeTaken);


  cancelTimer();
  setTimer();


}

function setTimer() {
  console.log('Set timer')
  var setTimer = 60 * 5,
    display = document.querySelector('#time');
  startTimer(setTimer, display)
}

function cancelTimer() {
  var interVal = localStorage.getItem('interVal');
  clearInterval(interVal)
}


function getScore(option) {
  console.log(score)
  if (option === true) {
    console.log('True')
    score = score + 5
    console.log(score);
  } else if (option == false) {
    console.log('false')
    restart();
  } else {
    console.log('error')
  }
  document.getElementById('userScore').innerHTML = score;
  document.getElementById('attemptsValue').innerHTML = attempts;

}

function endGame(option) {
  if (option === true) {
    console.log('True')
    // cancelTimer();
    restart();
    window.location.href = "./checkout.html";

  } else if (option == false) {
    console.log('false')
  } else {
    console.log('error')
  }

}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  getScore(option.success);
  endGame(option.endGame);
  if (nextTextNodeId <= 0) {
    console.log('Select option')
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)

}

//Stage 1
const textNodes = [
  {
    id: 1,
    text: 'Help Me, I am trapped inside Bamazon and I need help!',
    options: [

      {
        text: 'What the hell is going on?',
        nextText: 2,
        success: true
      },

      {
        text: 'I didnt contact customer support?',
        nextText: 3,
        success: true
      },
      {
        text: 'Emm, Okay I will help you! What can I do?',
        nextText: 4,
        success: true
      },
      {
        text: 'End chat',
        nextText: 1000,
        success: true
      },

    ]
  },

  {
    id: 2,
    text: 'The manager hasnt been the same...',
    options: [
      {
        text: 'Okay...',
        nextText: 4,
        success: true
      }
    ]
  },

  {
    id: 3,
    text: 'I am not customer support...',
    options: [
      {
        text: 'Okay...',
        nextText: 4,
        success: true
      }
    ]
  },

  {
    id: 4,
    text: 'I am starving order food please',
    options: [
      {
        text: 'Buy a nut bar!',
        nextText: 5,
        success: true
      },
      {
        text: 'Buy him beans!',
        nextText: 6,
        success: true
      },
      {
        text: 'Buy him dog food',
        nextText: 7,
        success: true
      }
    ]
  },

  //Game Over
  {
    id: 5,
    text: 'Oh no... I am allergic to nuts.. you have killed me.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
        success: false
      },
      {
        text: 'End Game',
        endGame: true
      }
    ]
  },

  {
    id: 6,
    text: 'Okay, time to escape! I need to find a way out, Beside me is a closet, Office and Security room'
    ,
    options: [
      {
        text: 'Go to closet',
        nextText: 9,
        success: true
      },
      {
        text: 'Go to Office',
        nextText: 13,
        success: true
      },
      {
        text: 'Go to security Room',
        nextText: 14,
        success: true
      }
    ]
  },

  {
    id: 7,
    text: 'Why did you make me eat that dog food? I think im gonna be sick! I am running to the bathroom now thanks to you.'
    ,
    options: [
      {
        text: 'Hurry up, it is time to escape!',
        nextText: 6,
        success: true
      },
      {
        text: 'Look around while your in the bathroom',
        nextText: 8,
        success: true
      }
    ]
  },

  {
    id: 8,
    text: 'I see an open vent that looks like I can reach and fit into...'
    ,
    options: [
      {
        text: 'Climb into the vent!', //Vent Path... Continuess at bottom of page
        nextText: 42,
        success: true
      },
      {
        text: 'It could lead to a dead end... go back',
        nextText: 6,
        success: true
      }
    ]
  },

  {
    id: 9,
    text: 'Okay, I am now in the closet! Its pretty emtpy... all I see is a box and a drawer'
    ,
    options: [
      {
        text: 'Open the box!',
        setState: { boxChecked: true },
        requiredState: (currentState) => currentState.boxChecked != true,
        nextText: 10,
        success: true
      },
      {
        text: 'Open the Drawer!',
        requiredState: (currentState) => currentState.uniform != true,
        nextText: 11,
        success: true
      },
      {
        text: 'Go to the Security Room',
        nextText: 14,
        success: true

      },
      {
        text: 'Go to Office',
        nextText: 13,

      }
    ]
  },

  {
    id: 10,
    text: 'The box is empty...'
    ,
    options: [
      {
        text: 'Open the Drawer!',
        requiredState: (currentState) => currentState.uniform != true,
        nextText: 11,
        success: true
      },
      {
        text: 'Okay, head to the Office now.',
        nextText: 13,
        success: true

      },
      {
        text: 'Okay, head to the security room now.',
        nextText: 14,
        success: true
      }
    ]
  },

  {
    id: 11,
    text: 'There is a security guard uniform in here!'
    ,
    options: [
      {
        text: 'Thats cool, but theres no time to admire uniforms... go to the Office!',
        nextText: 13,
        success: true
      },
      {
        text: 'This is no time for dressup... head to the security room!',
        nextText: 14,
        success: true
      },
      {
        text: 'Change into the security guard uniform',
        setState: { uniform: true },
        nextText: 12,
        success: true
      }
    ]
  },

  {
    id: 12,
    text: 'Okay i have the uniform on me! Maybe I should go to the office now or the security room'
    ,
    options: [
      {
        text: 'Go to the office',
        nextText: 13,

      },
      {
        text: 'Go to the security room',
        nextText: 14,
        success: true
      }
    ]
  },

  {
    id: 13,
    text: 'Okay I am now in the office'
    ,
    options: [
      {
        text: 'Look around',
        requiredState: (currentState) => currentState.keycard != true,
        setState: { keycard: true },
        nextText: 15,
        success: true
      },
      {
        text: 'Go to the security room',
        nextText: 14,
        success: true
      },

      {
        text: 'Go to the closet!',
        nextText: 9,

      }

    ]
  },

  {
    id: 14,
    text: 'Okay I am now in the security room, no turning back now... It will be too suspicous'
    ,
    options: [
      {
        text: 'Get through with the keycard',
        requiredState: (currentState) => currentState.keycard & !currentState.uniform,
        nextText: 17,
        success: true
      },
      {
        text: 'Get through with the uniform',
        requiredState: (currentState) => currentState.uniform,
        nextText: 18,
        success: true
      },
      {
        text: 'Get through with the uniform and use the keycard!',
        requiredState: (currentState) => currentState.keycard && currentState.uniform,
        nextText: 19,
        success: true
      },
      {
        text: 'Go through! ',
        requiredState: (currentState) => currentState.keycard != true && currentState.uniform != true,
        nextText: 16,
        success: true
      }
    ]
  },


  {
    id: 15,
    text: 'I found a keycard! I picked it up'
    ,
    options: [
      {
        text: 'Go to the secuity room',
        nextText: 14,
        success: true
      },
      {
        text: 'Go to the Closet',
        nextText: 9,

      }


    ]
  },

  //Game end
  {
    id: 16,
    text: 'I got caught! They were all wearing uniforms... and a keycard probably would have helped me.'
    ,
    options: [
      {
        text: 'Restart',
        nextText: -1,
        success: false
      },
      {
        text: 'End Game',
        endGame: true
      }


    ]
  },

  //Stage 2

  //Path with keycard and no Uniform
  {
    id: 17,
    text: 'I made it through the secuity room and into the canteen however, I have been called into HR... Should i go?'
    ,
    options: [
      {
        text: 'Yes, Go!',
        nextText: 21,
        success: true
      },
      {
        text: 'No, dont go. Ignore them!',
        nextText: 20,
        success: true
      }

    ]
  },


  {
    id: 20,
    text: 'They didnt like the way I ignored them and now I have been caught... '
    ,
    options: [
      {
        text: 'Restart',
        nextText: -1,
        success: false
      },
      {
        text: 'End Game',
        endGame: true
      }


    ]
  },
  {
    id: 21,
    text: 'They asked me why I have no uniform... What should I tell them?'
    ,
    options: [
      {
        text: 'Tell them that your dog ate it...',
        nextText: 22,
        success: true
      },
      {
        text: 'Tell them that you are new here...',
        nextText: 23,
        success: true
      },
      {
        text: 'Tell them that you thought it was non uniform day...',
        nextText: 24,
        success: true
      }
    ]
  },
  {
    id: 22,
    text: 'They didnt believe me... I got caught!'
    ,
    options: [
      {
        text: 'Restart',
        nextText: -1,
        success: false
      },
      {
        text: 'End Game',
        endGame: true
      }
    ]
  },

  {
    id: 23,
    text: 'That worked and they actually believed me! They let me go without further questioning!'
    ,
    options: [
      {
        text: 'Okay, thats good!',
        nextText: 28,
        success: true
      }
    ]
  },

  {
    id: 24,
    text: 'They are asking me what my employee ID number is... I dont know any, and my own ID will not work here'
    ,
    options: [
      {
        text: 'Tell them it is 1234',
        nextText: 25,
        success: true
      },
      {
        text: 'Tell them it is 9876',
        nextText: 23,
        success: true
      }
    ]
  },

  {
    id: 25,
    text: 'That wasnt the right ID! I got caught...'
    ,
    options: [
      {
        text: 'Restart',
        nextText: -1,
        success: false
      },
      {
        text: 'End Game',
        endGame: true
      }
    ]
  },

  //End of path with keycard and no Uniform


  //Path with Uniform and no Keycard
  {
    id: 18,
    text: 'I made it through the secuity room and into the canteen however, There are security guards ahead approaching me and they are looking to talk.'
    ,
    options: [
      {
        text: 'Ask them how there shift is going',
        nextText: 26,
        success: true
      },
      {
        text: 'Tell them you cant talk right now as you have been called to the manager! [LIE]',
        nextText: 27,
        success: true
      }
    ]
  },
  {
    id: 26,
    text: 'They didnt reconise me and became suspicous... I was caught...'
    ,
    options: [
      {
        text: 'Restart',
        nextText: -1,
        success: false
      },
      {
        text: 'End Game',
        endGame: true
      }
    ]
  },

  {
    id: 27,
    text: 'Phew... I made it pass them. That wasnt too bad.'
    ,
    options: [
      {
        text: 'Okay thats good!',
        nextText: 28,
        success: true
      }
    ]
  },
  // End of path with Uniform and no Keycard

  //Path with Uniform and with a Keycard
  {
    id: 19,
    text: 'I made it through the secuity room and into the canteen. Wearing this uniform and having the keycard is working great!'
    ,
    options: [
      {
        text: 'Okay thats good!',
        nextText: 28,
        success: true
      }
    ]
  },
  //End of path with Uniform and with a Keycard



  //Stage 3

  {
    id: 28,
    text: 'I can smell the fresh air from here! Im getting close... Listen... I have been thinking while escaping and I think I should confront the boss of this warehouse before I escape. What do you think?'
    ,
    options: [
      {
        text: 'Dont confront him, thats insane. Continue trying to get out.',
        nextText: 37,
        success: true
      },
      {
        text: 'Confront the boss! Kick his butt!',
        nextText: 29,
        success: true
      }
    ]
  },

  //Start of Confronting Boss Path
  {
    id: 29,
    text: 'Okay... I will confront the boss. I think I know where the office is at... But I will ask one last time... Should I fight him?'
    ,
    options: [
      {
        text: 'Yes Fight him! Dont think twice about it.',
        nextText: 30,
        success: true
      },
      {
        text: 'Actually... I wouldnt if I was you... lets not be silly.',
        nextText: 33,
        success: true
      }
    ]
  },

  {
    id: 30,
    text: 'I have dealt with the boss...He wont be well for a while'
    ,
    options: [
      {
        text: 'That is good... Now get out of there... and dont speak about what happened in there... I wouldnt draw too much attention on yourself... or me',
        nextText: 31,
        success: true
      },
      {
        text: 'That is good... Now get out there... and report what has happened in there... The whole world should know!',
        nextText: 32,
        success: true
      }
    ]
  },

  {
    id: 33,
    text: 'Okay I wont confront the boss... Im running out of here!'
    ,
    options: [
      {
        text: 'Run for it! You got this',
        nextText: 34,
        success: true
      },

    ]
  },

  {
    id: 31,
    text: 'I wont speak about this with anyone! Thank you so much for helping me. I am forever grateful'
    ,
    options: [
      {
        text: 'GoodBye',
        nextText: 100,
        success: true
      }
    ]
  },

  {
    id: 32,
    text: 'Once I get back home, the whole world will know about this horrible place! Thank you so much for your help. I am forever grateful.'
    ,
    options: [
      {
        text: 'GoodBye',
        // nextText: 101
        nextText: 100,
        success: false
      },
      {
        text: 'End Game',
        endGame: true
      }
    ]
  },

  {
    id: 34,
    text: 'I have been caught by the guards... They told me I cant escape and my only option is to join them or else they will kill me. I have seen too much.'
    ,
    options: [
      {
        text: 'I think if you want to live... You will have to join them.',
        nextText: 35,
        success: true
      },
      {
        text: 'Dont join them! You are better than this!',
        nextText: 36,
        success: true
      }

    ]
  },

  {
    id: 35,
    text: 'I will join them... I dont think i have any other option... Thank you for trying to help me. Your identity will be safe with me, I promise. Farewell...'
    ,
    options: [
      {
        text: 'Goodbye',
        nextText: 100,
        success: true
      }

    ]
  },

  {
    id: 36,
    text: 'I would never do such a thing! I will die with my dignity. But I didnt succeed with my escape.'
    ,
    options: [
      {
        text: 'Restart',
        nextText: -1,
        success: false
      },
      {
        text: 'End Game',
        endGame: true
      }
    ]
  },
  //End of Confronting Boss Path

  //Dont confront Boss Path from the first choice... Forklift path

  {
    id: 37,
    text: 'Okay... I wont confront him... I see a forklift ahead of me. Maybe I could use it to drive out of here. But theres one problem. The guy currently sitting on it is buff.'
    ,
    options: [
      {
        text: 'Fight Him instead... I believe in you',
        nextText: 38,
        success: true
      },
      {
        text: 'You could try and distract him somehow and then get on the forklift and escape.',
        nextText: 40,
        success: true
      }
    ]
  },

  {
    id: 38,
    text: 'Okay, I will fight him... I got this!'
    ,
    options: [
      {
        text: 'Thats the spirit!',
        nextText: 39,
        success: true
      },
      {
        text: 'Kick his butt!',
        nextText: 39,
        success: true
      }
    ]
  },

  {
    id: 39,
    text: 'That didnt work out as planned... I got my butt kicked...'
    ,
    options: [
      {
        text: 'Restart',
        nextText: -1,
        success: false
      },
      {
        text: 'End Game',
        endGame: true
      }

    ]
  },

  {
    id: 40,
    text: 'Okay I will try to distract him...I knocked over a few boxes of packages... He got off the forklift and is now checking out the issue.'
    ,
    options: [
      {
        text: 'Good one! Now get on the forklift and put your foot on the padel and drive out of there!',
        nextText: 41,
        success: true
      }

    ]
  },

  {
    id: 41,
    text: 'Im driving out of here! I have escaped thanks to you! I am so grateful for the help.'
    ,
    options: [
      {
        text: 'No problem! Good Bye',
        // nextText: 103
        nextText: 100,
        success: true
      }
    ]
  },

  //End of dont confront Boss Path from the first choice... Forklift path



  //Start of the vent path from the very beginning
  {
    id: 42,
    text: 'Its like a maze in here... I have no clue where im going... You will have to guide me out of here... I should have sent you access to a map when we first started to talk. That might be useful. PS... You can find it in the utility section!'
    ,
    options: [
      {
        text: 'Im not sure what you mean? I cant find it! Just go back! ',
        nextText: 6,
        success: true
      },
      {
        text: 'Okay... Im pretty confident that I know how to get you out of here... ',
        nextText: 43,
        success: true
      }

    ]
  },

  {
    id: 43,
    text: 'Im so glad to here that! Tell me the directions!!!'
    ,
    options: [
      {
        text: 'You have to go North..West...North...and then East! ',
        nextText: 44,
        success: true
      },
      {
        text: 'You have to go North..East...North...and then West! ',
        nextText: 44,
        success: true
      },
      {
        text: 'You have to go North..West...South...and then East! ',
        nextText: 45,
        success: true //Corect Answer on the map
      },
      {
        text: 'You have to go West..North...West...and then North! ',
        nextText: 44,
        success: true
      }

    ]
  },

  {
    id: 44,
    text: 'That isnt correct...I am so lost... I think Im stuck here forever!'
    ,
    options: [
      {
        text: 'Restart',
        nextText: -1,
        success: false
      },
      {
        text: 'End Game',
        endGame: true
      }
    ]
  },
  {
    id: 45,
    text: 'I made it... Im out of that vent! I smell the fresh air! Should I climb the fence or sneak out in a delivery van'
    ,
    options: [
      {
        text: 'Sneak out in a Van! Thats bad ass...',
        nextText: 46,
        success: true
      },
      {
        text: 'Climb over the fance and make a break!',
        nextText: 47,
        success: true
      }

    ]
  },

  {
    id: 46,
    text: 'I think I escaped!...Im out of the premises... I will run out of this van whenever they open the door! Thank you so much!'
    ,
    options: [
      {
        text: 'You are welcome! Stay Safe!',
        nextText: 100,
        success: true
      }

    ]
  },

  {
    id: 47,
    text: 'Im stuck! I cant get my leg over...The guards have spotted me... Im done for!'
    ,
    options: [
      {
        text: 'Restart',
        nextText: -1,
        success: false
      },
      {
        text: 'End Game',
        endGame: true
      }
    ]
  },


  //Game Wins
  //Game Wins
  //Game Wins
  {
    id: 100, //'I wont speak about this with anyone! Thank you so much for helping me. I am forever grateful'
    text: ''
    ,
    options: [
      {
        text: 'Play Again',
        nextText: -1,
        success: false
      },
      {
        text: 'End Game',
        endGame: true
      }
    ]
  },

  //Game Over End Chat
  //Game Over End Chat
  //Game Over End Chat
  {
    id: 1000,
    text: 'You have left me to die... Bye.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
        success: false
      },
      {
        text: 'End Game',
        endGame: true
      }
    ]
  },
]
startGame()
