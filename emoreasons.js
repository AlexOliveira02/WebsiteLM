const emotionReasons = {
    "happy": [
        "I guess I'm in love <3",
        "I dunno, I'm just feeling so chill and I can't explain why",
        "I'm always happy, I'm a day-and-night happy person.",
        "ITS MY BIRTHDAY, IM TURNING 18",
        "Because I had a good grade on an exam.",
        "Because it's my mom's birthday.",
        "It's because I will spend the day with my boyfriend.",
        "It's a sunny day outside.",
        "It's been a good day.",
        "Had a great workout this morning. Feeling good and energized!",
        "Clap along if you feel like a room without a roof"
    ],
    "excited": [
        "Just booked a trip to New York, so I'm well excited.",
        "Because I'm going to study abroad for a semester and I've actually never left my home country so it's totally like a new chapter.",
        "I'm excited because I just got a promotion at work after months of hard effort.",
        "Excited cos Mario and Donkey Kong is coming out on the Switch. I'm such a fan!",
        "IM SO EXCITED AND JUST CANT HIDE IT IM ABOUT TO LOSE CONTROL AND I THINK I LIKE IT"
    ],
    "positive": [
        "because I just wrote my end-of-semester exams and if I keep a negative outlook I will surely get a negative grade so there I better stay positive",
        "It's a new day full of possibilities and I'm gonna make the most of it.",
        "I tested for COVID and it came out positive lol fml",
        "Because that's the person I am, I always try to stay positive."
    ],
    "amazing": [
        "Guys, I just finished reading 'The Celestial Odyssey', and I'm in awe. The storytelling, the plot twists, the characters... absolutely amazing. Haven't been this hooked on a book in ages! 📚🤩",
        "I GOT THE JOB!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    ],
    "spectacular": [
        "Just a little reminder: You are SPECTACULAR! Don't let anyone dull your sparkle. Shine bright, dream big, and remember, you have the power to light up the world! ✨💪"
    ],
    "good": [
        "because I don't feel bad hahah",
        "Just a simple good start to the day. Let's see what it brings...",
        ":)",
        "I don't know",
        "It's just been a good day"
    ],
    "cheered-up": [
        "I got myself some Ben & Jerry's. That'll sort me out for the night."
    ],
    "fantastic": [
        "I don't just feel fantastic, I feel FANTASTIQUE ✨✨✨✨✨✨✨✨✨✨✨"
    ],
    "great": [
        "cos I got high hahahah, feels greeeeeattttttttt",
        "Because I'm going to Italy tomorrow.",
        "I just got my license. Yasssssss!",
        "I'm going to have a date with my crush."
    ],
    "excellent": [
        "Everything is just perfect."
    ],
    "better": [
        "I've been super sick for the last two weeks but it's slowly going away, just the flu I think.",
        "Because I finally managed to get out of bed.",
        "I ate something today after being sick all week."
    ],
    "intellectual": [
        "I'm writing a research paper on AI advancements."
    ],
    "inspired": [
        "Today's gonna be full of new adventures."
    ],
    "curious": [
        "Just wanna know what this website is about...",
        "Nothing, just having a look."
    ],
    "relaxed": [
        "It's Friday night, I wanna take it easy."
    ],
    "calm": [
        "I presented my projects today and now it's all done and dusted!"
    ],
    "crazy": [
        "Going nuts here,",
        "Tried to cook dinner while watching kids. Kitchen's a crazy mess now!",
        "Heard someone talking to themselves on the bus. Crazy stuff! 😖😖😖😖😖",
        "Neighbor threw a party last night, thought I was gonna lose it."
    ],
    "sarcastic": [
        "I feel good."
    ],
    "ok": [
        "Weather's nice, nothing special but it's ok.",
        "Work was uneventful today, which is ok with me.",
        "Because I dunno, I'm not too bad and not too good, just average..",
        "it's just another day..................."
    ],
    "indifferent": [
        "My boss that bitch is planning to 'rejuvenate' the office with a new layout and furniture. I couldn't care less.",
        "Meh."
    ],
    "normal": [
        "today's a day like any day",
        "Today was an amalgamation of the ordinary, a symphony of the mundane. I woke up at the precise time as yesterday, the sun casting its predictable glow through my window. Breakfast was the usual affair, the same cereal I've had since time immemorial, each spoonful a testament to the unchanging rhythm of my existence. The journey to work was a replay of every other day, the same streets, the same faces. At work, the hours slipped by in a haze of familiar tasks, emails echoing the echoes of a thousand emails before. Lunch was a sandwich, indistinguishable from yesterday's or the day before’s sandwich. In the evening, the TV droned on, a backdrop to my thoughts, a steady stream of shows that blended into one continuous thread of televised normalcy. It was a day so soaked in the essence of normality that it bordered on the surreal, a dance of the everyday so perfectly choreographed that it almost, but not quite, transcended its own ordinariness.",
        "Watched some TV, did some laundry. A normal evening.",
        "Nothing unusual happened today, felt pretty normal.",
        "woke up, had breakfast, went to work - just a normal day"
    ],
    "surprised": [
        "So basically it was my birthday and my ex wrote after 100000000000 years of not being bothered. Weirdo. 😓",
        "Like what is this site even 😅"
    ],
    "relieved": [
        "The grades from my exam are back and I did quite well."
    ],
    "proud": [
        "I am a human.",
        "Because I am Brazilian."
    ],
    "strong": [
        "We will get through this together."
    ],
    "gorgeous": [
        "is it because I slay every day‍💁🏽‍♀️"
    ],
    "blessed": [
        "LIVE - LOVE - LAUGH",
        "Every time I look at my kids, when I see their"
    ],
    "lucky": [
        "A year ago I was in a car accident and honestly from what the doctors said I'm lucky to even be alive."
    ],
    "bored": [
        "I just got nothing to do."
    ],
    "tired": [
        "Because I'm sick of studying during my break",
        "I guess I'm feeling a bit under the weather. :(",
        "Because of work.",
        "I'm tired of my friend's behavior."
    ],
    "exhausted": [
        "we got exams at uni and I'm just so done with this‍😫 😫😫😫😫😫😫"
    ],
    "fed up": [
        "God I need to leave my job."
    ],
    "alone": [
        "because no one noticed that I was sad",
        "No one reaches out to me",
        "I feel that if I was gone nobody would care."
    ],
    "sad": [
        "because I failed my exam.",
        "I found out yesterday that my friends talk shit behind my back.",
        "Because I miss my dad.",
        "Because my dog passed away.",
        "I tried my best and it wasn't enough for her."
    ],
    "guilty": [
        "i've just really let my friend down, we fell out and all, it was a lot of drama and now im trying to get over it but i cantttt"
    ],
    "stressed": [
        "too. much. work. jesus.",
        "Because I have so much to do in so little time.",
        "It's just all my assignments, they're killing me!",
        "Cos I got a presentation today and I didn't practice."
    ],
    "anxious": [
        "My biopsy results are back tomorrow. I honestly don't know"
    ],
    "cold": [
        "I'm in Toronto and I've no idea how people here survive winters. I cannot stay out for longer than 2 minutes before it literally becomes PAINFUL"
    ],
    "lost": [
        "like the website doesn't have any instructions and I don't know what to do"
    ],
    "old": [
        "Like I've turned 25 today, man I feel old!!"
    ],
    "free": [
        "Finally divorced him!!"
]
};


export { emotionReasons };