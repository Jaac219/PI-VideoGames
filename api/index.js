//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Videogame, Plataform, Genre } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console

    try {
      // let genAction = await Genre.create({
      //   name: "Action",
      //   image_background: "https://media.rawg.io/media/games/83f/83f6f70a7c1b86cd2637b029d8b42caa.jpg"
      // })
      // let genRPG = await Genre.create({
      //   name: "RPG",
      //   image_background: "https://media.rawg.io/media/games/d5a/d5a24f9f71315427fa6e966fdd98dfa6.jpg"
      // })
      // let genAdventure = await Genre.create({
      //   name: "Adventure",
      //   image_background: "https://media.rawg.io/media/games/48c/48cb04ca483be865e3a83119c94e6097.jpg"
      // })
  
  
      // let plaXbox = await Plataform.create({
      //   name: "Xbox Series S/X",
      //   image_background: "https://media.rawg.io/media/games/082/082365507ff04d456c700157072d35db.jpg"
      // })
      // let plaPlay = await Plataform.create({
      //   name: "PlayStation 4",
      //   image_background: "https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg"
      // })
      // let plaXbox360 = await Plataform.create({
      //   name: "Xbox 360",
      //   image_background: "https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg"
      // })
  
  
      // let vgGrantAuto = await Videogame.create({
      //   name: "Grand Theft Auto V",
      //   description: "asdfasfda",
      //   // `Minimum:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1, Windows Vista 64 Bit Service Pack 2* (*NVIDIA video card recommended if running Vista OS)Processor: Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 CPUs) / AMD Phenom 9850 Quad-Core Processor (4 CPUs) @ 2.5GHzMemory: 4 GB RAMGraphics: NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11)Storage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes: Over time downloadable content and programming changes will change the system requirements for this game.  Please refer to your hardware manufacturer and www.rockstargames.com/support for current compatibility information. Some system components such as mobile chipsets, integrated, and AGP graphics cards may be incompatible. Unlisted specifications may not be supported by publisher.     Other requirements:  Installation and online play requires log-in to Rockstar Games Social Club (13+) network; internet connection required for activation, online play, and periodic entitlement verification; software installations required including Rockstar Games Social Club platform, DirectX , Chromium, and Microsoft Visual C++ 2008 sp1 Redistributable Package, and authentication software that recognizes certain hardware attributes for entitlement, digital rights management, system, and other support purposes.     SINGLE USE SERIAL CODE REGISTRATION VIA INTERNET REQUIRED; REGISTRATION IS LIMITED TO ONE ROCKSTAR GAMES SOCIAL CLUB ACCOUNT (13+) PER SERIAL CODE; ONLY ONE PC LOG-IN ALLOWED PER SOCIAL CLUB ACCOUNT AT ANY TIME; SERIAL CODE(S) ARE NON-TRANSFERABLE ONCE USED; SOCIAL CLUB ACCOUNTS ARE NON-TRANSFERABLE.  Partner Requirements:  Please check the terms of service of this site before purchasing this software.",
      //   // "recommended": "Recommended:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1Processor: Intel Core i5 3470 @ 3.2GHz (4 CPUs) / AMD X8 FX-8350 @ 4GHz (8 CPUs)Memory: 8 GB RAMGraphics: NVIDIA GTX 660 2GB / AMD HD 7870 2GBStorage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes:"`,
      //   released: "2013-09-17",
      //   rating: 4.48
      // })
      // let vgTheWitcher = await Videogame.create({
      //   name: "The Witcher 3: Wild Hunt",
      //   description: "juego numero 2",
      //   // `Minimum:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1, Windows Vista 64 Bit Service Pack 2* (*NVIDIA video card recommended if running Vista OS)Processor: Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 CPUs) / AMD Phenom 9850 Quad-Core Processor (4 CPUs) @ 2.5GHzMemory: 4 GB RAMGraphics: NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11)Storage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes: Over time downloadable content and programming changes will change the system requirements for this game.  Please refer to your hardware manufacturer and www.rockstargames.com/support for current compatibility information. Some system components such as mobile chipsets, integrated, and AGP graphics cards may be incompatible. Unlisted specifications may not be supported by publisher.     Other requirements:  Installation and online play requires log-in to Rockstar Games Social Club (13+) network; internet connection required for activation, online play, and periodic entitlement verification; software installations required including Rockstar Games Social Club platform, DirectX , Chromium, and Microsoft Visual C++ 2008 sp1 Redistributable Package, and authentication software that recognizes certain hardware attributes for entitlement, digital rights management, system, and other support purposes.     SINGLE USE SERIAL CODE REGISTRATION VIA INTERNET REQUIRED; REGISTRATION IS LIMITED TO ONE ROCKSTAR GAMES SOCIAL CLUB ACCOUNT (13+) PER SERIAL CODE; ONLY ONE PC LOG-IN ALLOWED PER SOCIAL CLUB ACCOUNT AT ANY TIME; SERIAL CODE(S) ARE NON-TRANSFERABLE ONCE USED; SOCIAL CLUB ACCOUNTS ARE NON-TRANSFERABLE.  Partner Requirements:  Please check the terms of service of this site before purchasing this software.",
      //   // "recommended": "Recommended:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1Processor: Intel Core i5 3470 @ 3.2GHz (4 CPUs) / AMD X8 FX-8350 @ 4GHz (8 CPUs)Memory: 8 GB RAMGraphics: NVIDIA GTX 660 2GB / AMD HD 7870 2GBStorage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes:"`,
      //   released: "2015-05-18",
      //   rating: 4.67
      // })
      
      // console.log(vgGrantAuto.__proto__)
      // vgGrantAuto.setGenres(1);
      // vgGrantAuto.setGenres(2);
      // vgGrantAuto.setGenres(3);

      // vgGrantAuto.setPlataforms(plaXbox.id);
      // vgGrantAuto.setPlataforms(plaXbox360.id);
    } catch(error) {
      
    }
  });
});
