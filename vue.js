var app = new Vue({
	el:'#app',

	data: {
			newguess:'',
			guesses: [],
			word: '',
			filledWord:'',
			guessesleft: 6,
			playing: false,
			img:'imgs/Drawing1.jpeg',
		},

	watch: {
		guessesleft: function() {
			if(this.guessesleft===6)
				this.img='imgs/Drawing1.jpeg';
			else if(this.guessesleft===5)
				this.img='imgs/Drawing2.jpeg';
			else if(this.guessesleft===4)
				this.img='imgs/Drawing3.jpeg';
			else if(this.guessesleft===3)
				this.img='imgs/Drawing4.jpeg';
			else if(this.guessesleft===2)
				this.img='imgs/Drawing5.jpeg';
			else if(this.guessesleft===1)
				this.img='imgs/Drawing6.jpeg';
			else {
				this.img='imgs/Drawing7.jpeg';
				window.alert("YOU LOST! The word was: "+this.word);
				this.playing=false;
			}
				
		}
	},

	methods: {

		nextGuess: function() {
			this.guesses.push(this.newguess);
			
			let count=0;
			for(var i=0; i<this.word.length; i++) {
				if (this.word[i]===this.newguess) {
					count++;
					this.filledWord=this.filledWord.substr(0,i)+this.newguess+this.filledWord.substr(i+1,this.filledWord.length);
				}
			}
			if (count===0) this.guessesleft=this.guessesleft-1;

			else {
				let blanks=0;
				for(var j=0; j<this.word.length; j++) {
					if (this.filledWord[j]==="-") {
						blanks++;
					}
				}
				if (blanks===0) {
					this.alert="Won";
					window.alert("Congrats! You WON! The word was: "+ this.word);
					this.playing=false;
				}
			}
		},

		startGame: function() {
			this.playing=true;
			var myurl="http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
			fetch(myurl).then(response => {
				return response.json();
			}).then(json => {
				this.word=json.word;
				this.filledWord='';
				for(var i=0;i<this.word.length;i++) {
					this.filledWord+='-';
				}
				this.guessesleft=6;
				this.guesses=[];
				this.img='imgs/Drawing1.jpeg';
			});
		}
	}
});