class CodeExecutor {
  constructor() {
    this.timeout = 5000;
    this.context = {};
  }

  createGameAPI() {
    return {
      // Рух персонажа
      move: (direction) => {
        const validDirections = ['north', 'south', 'east', 'west'];
        if (!validDirections.includes(direction)) {
          throw new Error(`Невірний напрямок. Використай: ${validDirections.join(', ')}`);
        }
        
        if (window.gameMove) {
          window.gameMove(direction);
        }
        
        return `Рухаюсь на ${direction}`;
      },

      // Взаємодія з об'єктами
      interact: (objectId) => {
        if (window.gameInteract) {
          window.gameInteract(objectId);
        }
        return `Взаємодія з ${objectId}`;
      },
    };
  }

  validateSyntax(code) {
    try {
      new Function(code);
      return true;
    } catch (error) {
      throw new Error(`Синтаксична помилка: ${error.message}`);
    }
  }

  async execute(code, level = 1) {
    const consoleOutput = [];
    
    try {
      // Валідація
      this.validateSyntax(code);

      // Створення контексту
      const gameAPI = this.createGameAPI();
      
      const context = {
        // Game API
        ...gameAPI,
        
        // Console
        console: {
          log: (...args) => {
            const message = args.map(a => 
              typeof a === 'object' ? JSON.stringify(a) : String(a)
            ).join(' ');
            consoleOutput.push({ type: 'info', message });
          },
          error: (...args) => {
            const message = args.map(a => String(a)).join(' ');
            consoleOutput.push({ type: 'error', message });
          },
        },
      };

      // Виконання коду
      const func = new Function(
        ...Object.keys(context),
        `
        "use strict";
        ${code}
        `
      );

      const result = func(...Object.values(context));

      // Перевірка умов рівня
      const levelCheck = this.checkLevelConditions(code, level);

      return {
        success: true,
        result,
        output: consoleOutput,
        levelComplete: levelCheck.complete,
        message: levelCheck.message,
      };

    } catch (error) {
      consoleOutput.push({ 
        type: 'error', 
        message: error.message 
      });

      return {
        success: false,
        error: error.message,
        output: consoleOutput,
        hint: this.generateHint(error),
      };
    }
  }

  checkLevelConditions(code, level) {
    switch (level) {
      case 1:
        // Рівень 1: Створити змінну light = true
        const hasLet = /let\s+light/.test(code);
        const hasConst = /const\s+light/.test(code);
        const hasTrue = /=\s*true/.test(code);
        
        if ((hasLet || hasConst) && hasTrue) {
          // Активувати світло в грі
          if (window.gameSetLight) {
            window.gameSetLight(true);
          }
          
          return {
            complete: true,
            message: '✨ Світло з\'явилось! Тепер ти бачиш двері.',
          };
        }
        return {
          complete: false,
          message: 'Створи змінну light зі значенням true',
        };

      default:
        return { complete: false, message: '' };
    }
  }

  generateHint(error) {
    const errorMsg = error.message.toLowerCase();
    
    const hints = {
      'is not defined': '💡 Підказка: Спочатку оголоси змінну через let або const',
      'unexpected token': '💡 Підказка: Перевір синтаксис - можливо пропущена крапка з комою',
      'cannot read': '💡 Підказка: Об\'єкт не існує або не має цієї властивості',
      'invalid': '💡 Підказка: Перевір правильність написання команди',
    };

    for (let [key, hint] of Object.entries(hints)) {
      if (errorMsg.includes(key)) {
        return hint;
      }
    }

    return '💡 Підказка: Подивись на приклад у панелі завдань';
  }
}

export default CodeExecutor;