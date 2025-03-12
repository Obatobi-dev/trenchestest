let Quiz = {
    Question: [
        {question: 'You just bought a new coin. How long until you start shilling it like you created it', option: [{text: 'Instantly', correct: true}, {text: 'After a 2x'}, {text: 'Only when I’m down bad '}, {text: 'Never'}]},

        {question: 'You just 100x’d a trade. How fast do you blow the profits on another rug', option: [{text: 'Instantly'}, {text: 'Within 24 hours'}, {text: 'After one week'}, {text: 'Never'}]},

        {question: 'What is the primary purpose of a memecoin', option: [{text: 'To make everyone rich, but only the first 10 buyers actually win'}, {text: 'To provide zero utility while creating infinite hopium and exit liquidity'}, {text: 'To pump, dump, and get featured in a “How I lost everything” YouTube video'}, {text: 'To unite degens under a single purpose—gambling on vibes alone'}]},

        {question: 'You’re down 94% on a coin. How do you explain this to your family', option: [{text: '“It’s not a loss until I sell.”'}, {text: '“This is just a temporary dip.”'}, {text: '“I was early.”'}, {text: '“I invested in an innovative, community-driven project.”'}]},

        {question: 'The contract has a function called <span class="text-success">stealLiquidity().</span> Is this bullish for the dev’s bank account', option: [{text: 'Extremely bullish'}, {text: 'Mega bullish'}, {text: 'Unbelievably bullish '}, {text: 'Insanely bullish '}]},

        {question: 'If you see a memecoin rising, what’s your immediate reaction', option: [{text: 'Buy instantly'}, {text: 'Wait for a dip that never comes'}, {text: 'Shill it everywhere'}, {text: 'Call it a scam and stay sidelined'}]},

        {question: 'You just sold for a 2x, and the price instantly 50x’s. What’s your coping mechanism', option: [{text: 'Convince myself it was a lucky trade'}, {text: 'Call it a scam'}, {text: 'Start stroking it.'}, {text: 'Rebuy at the peak'}]},

        {question: 'The dev just tweeted “Going to bed.” How long until he disappears forever', option: [{text: 'Immediately'}, {text: 'Within 6 hours'}, {text: '24 hours max '}, {text: 'Hawk Tuah Girl Picture (Put a picture of hawk tuah)'}]},

        {question: 'You check the team’s bios, and they all say “Crypto Enthusiast.” What’s your exit strategy', option: [{text: 'Sell immediately'}, {text: 'Pray for a quick pump'}, {text: 'Ask for their LinkedIn profiles'}, {text: 'Hold until zero'}]},

        {question: 'A project says “Utility coming soon,” but they’ve been saying that for three months. What’s actually coming', option: [{text: 'A new logo'}, {text: 'A staking pool'}, {text: 'A nuke'}, {text: 'Absolutely nothing'}]},

        {question: 'Which country would most likely launch a coin and rug', option: [{text: 'Romania'}, {text: 'Argentina'}, {text: 'India'}, {text: 'France'}]},

        // {question: 'The project just announced a "game-changing partnership" with a mysterious partner. What happens next', option: [{text: ''}, {text: ''}, {text: ''}, {text: ''}]},

        {question: `<img class="img" src="${App_Img('a-5.jpg')}">“The Quant Kid” just rugged his community for $30K and immediately launched another token. What happens next`, option: [{text: 'Degens ape in again '}, {text: 'Claims the first rug was “a social experiment”'}, {text: 'Holds a Twitter Space titled “Clearing the FUD”'}, {text: 'Rugs again, then rebrands as a crypto educator '}]},

        {question: `<img class="img" src="${App_Img('a-1.jpg')}">What did Hawk Tuah Girl do after she rugpulled her own coin`, option: [{text: 'Gone to bed'}, {text: 'She Hawk Tuah on that thang'}, {text: 'Went on her podcast for Hawk Tuahing or sum'}]},
        
        {question: 'Which of these statements best describes your reaction after a memecoin "rug pull"', option: [{text: `<img class="img" src="${App_Img('a-3.jpg')}">`}, {text: `<img class="img" src="${App_Img('a-2.jpg')}">`}, {text: `<img class="img" src="${App_Img('a-4.jpg')}">`}]},

        {question: 'The team just delayed the launch for the third time, claiming they are “perfecting the contract.” What’s really going on', option: [{text: 'They’re front-running their own launch '}, {text: 'The dev is copy-pasting code from another project'}, {text: 'They already spent the presale funds'}, {text: 'They’re waiting for better market conditions'}]},

        {question: 'How much money do you want to make', option: [{text: '1 Billion Solana'}, {text: '1 Billion Bitcoin'}, {text: '1 Billion TrenchesTest'}, {text: '1 Billion Ethereum (Wrong Answer)'}]},

        // {question: '', option: [{text: ''}, {text: ''}, {text: ''}, {text: ''}]},

        // {question: '', option: [{text: ''}, {text: ''}, {text: ''}, {text: ''}]},
    ],
    Iq:[
        {name: 'Jeeter', description: 'OMGHHASG PROFIT LET ME SELL.', min: 0, max: 68},

        {name: 'Retard', description: 'Yeah, you’re just retarded nigga"', min: 69, max: 69},
        
        {name: 'Streamer Exit Liquidity', description: 'This is good if it’s real—no, it fucking isn’t, you fucking retard. You’re just feeding these streamers.', min: 70, max: 75},

        {name: 'Pleb', description: 'You are just a broke ass nigga.', min: 76, max: 85},

        {name: 'Nerdigga', description: 'Bro, this is actually good. No, it’s actually not, you fucking nerd.', min: 86, max: 95},

        {name: 'Rugger', description: 'You gotta be one to spot one, right?', min: 96, max: 105},

        {name: 'Farmer', description: 'You’re farming everyone just like you farmed cotton in the good old days.', min: 106, max: 115},

        {name: 'Gambler', description: 'You are a gambling nigga', min: 116, max: 125},

        {name: 'Hustler', description: 'You probably on some duke dennis typeshit', min: 126, max: 135},

        {name: 'Insider', description: 'You move in the shadows, making plays before the masses even know what’s coming. While others chase trends, you’re already setting them', min: 136, max: 145},

        {name: 'Maestro', description: 'You’re trying so hard to be Cupsey, but the best part is, you’re actually close.', min: 146, max: 160},

        {name: 'Cupsey', description: 'You’re not Cupsey nigga, only Cupsey is the real nigga', min: 420, max: 420},
    ],
    Quest(index = this.Index){
        return this.Question[index];
    },
    Index: 0,
    Shuffle(type = ''){
        // reset question
        for(let i of this.Question){
            delete i.answered; // remove answered
            for(let j of i.option){
                delete j.choosed; // remove choosed from options
            }
        }

        this.Index = 0;

        //   set the index to the arrays length
        let i = this.Question.length, j, temp;
        //   create a loop that subtracts everytime it iterates through
        while (--i >= 0) {
            //  create a random number and store it in a variable
            j = Math.floor(Math.random () * (i+1));
            // create a temporary position from the item of the random number
            temp = this.Question[j];
            // swap the temp with the position of the last item in the this.Question    
            this.Question[j] = this.Question[i];
            // swap the last item with the position of the random number 
            this.Question[i] = temp;
        }

        
        // Reset this variable
        this.VideShuff = [0]; // reset
        for(let x = 0; x < 4; x++){
            this.VideShuff.push(Math.ceil(Math.random () * (this.Question.length - 1))); // add 3 more items to the variable
        }
    },
    VideShuff: [0],
    Next(){
        // Check answered question and left, then, Shuffle the questions
        // Check if the question is answered or not
        let quest = this.Quest();
        
        // if(quest.answered){
            if(this.Index == (this.Question.length - 1)){
                //end
                this.Result();
            } else {
                this.Index++;
                this.Show();
            }
        // } else {
			// App.message(`Choose an option`)
            // alert(`Choose an option`); // Ask to choose option is none was chosen
        // }
    },
    Option(q, o){
        // q: question, o: option
        let quest = this.Quest();
        let option = quest.option;

        // loop through all the options, in case the user changes the option
        // remove any choosed option
        for(let i of option){
            delete i.choosed; // remove
        }

        quest.answered = true; // Proof of answerd to question
        option[o].choosed = true; // add to the newest option

        this.Show(); // rebuild
    },
    Result(){
        let correct = 0;
        for(let i of this.Question){
            for(let j of i.option){
                if(j.correct && j.choosed) correct++;
            }
        }

        document.querySelector(this.Identifier).innerHTML = (`You got ${correct} answers currect <button onclick='Quiz.Init()'>again?</button>`)

        let iq = {};
        let num = getRandomInteger(0, 420);
        if(num < 320) num = num / 2;
        if(num > 320) num = 420;
        num = Math.ceil(num)
        for(let x of this.Iq){
            if(num >= x.min && num <= x.max){
                iq = (x)
            }
        }

		document.querySelector(this.Identifier).innerHTML = `
		<div class="mw-400 m-auto text-center">
			<h1>Result</h1>
			<h3>You are ${iq.name} (${num} IQ)</h3>
			<img src="${App_Img('sponge-bob.svg')}" alt="img" class="img- object-fit-contain img-thumbnail my-4 w-100" style="width: 220px; height: 220px;">
            <p>${iq.description}</p>
            <button onclick="Quiz.Init()" class="btn btn-dark w-100 mt-4">Take Again ?</button>
		</div>
		`
    },
    Show(){
        document.querySelector(this.Identifier).style.animation = '';

        // Start / init
        // Build board
        let b = this.Quest(); // This question is coming with already shuffles question

        let board = `<div class="bg-black card text-white p-4 px-3">
        <h3><i class="fal fa-quote-left fa-1x"></i> ${b.question}?</h3>
        </div>`;

        let vid = this.VideShuff;
        let index = this.Index;
        // Loop answers
        for(let i in b.option){
            let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'][i].toUpperCase(); // Show option in alphabets instead of letter
            let option = b.option[i];

            board += `<div class=""><p class="${option.choosed?'active ':''}cursor-pointer card option p-3 h-100" onclick="Quiz.Option(${index}, ${i})" style="transition: all 0.33s"><span class"text-upper">${alphabet}.</span> <span>${option.text}</span></p></div>`;
        }

        board += `<button class="btn btn-dark w-100 text-upper mt-2" onclick="${vid.includes(index)?`Quiz.Video()`:`Quiz.Next()`}">next</button></div>`; // Add next button to the build


        document.querySelector(this.Identifier).innerHTML = (board)
        document.querySelector(this.Identifier).style.animation = 'example 1s ease-out';
    },
    Video(){
        board = `<video id="video" autoplay height="300" style="width: 100%" onended="Quiz.Next()">
        <source src="${App.location.origin}/resource/vid/quiz-video.mp4" type="video/mp4">
        <source src="${App.location.origin}/resource/vid/quiz-video.ogg" type="video/ogg"> Your browser does not support the video tag.
        </video>
        <button class="btn btn-dark w-100 text-upper mt-4" onclick="Quiz.Next()">skip</button>`;

        // Show video to the board
        document.querySelector(this.Identifier).innerHTML = (board)
    },
    Identifier: null,
    Init(identity = '#board'){
        this.Identifier = identity;
        this.Shuffle(); // Shuffle
        this.Show(); // build
    }
}