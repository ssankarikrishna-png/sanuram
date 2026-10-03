/* ============================================================================
   ♡  CONTENT FILE — THIS IS THE ONLY FILE YOU NEED TO EDIT  ♡
   ----------------------------------------------------------------------------
   • Change any text between the "quotes".
   • To ADD something (a memory, a photo, a letter...), copy one whole
     { ... }, line (from the { to the }, ) and paste it under the last one.
   • To REMOVE something, delete its whole { ... }, block.
   • Don't delete commas, quotes or brackets — just edit the words inside.
   • Save the file, refresh the page, done. No rebuilding. ✨

   Tip: anywhere you see {him} or {me}, the site swaps in the names below.
   Tip: use \n inside a "quote" to start a new line.
   ========================================================================== */

window.SITE = {

  /* ─────────────── 1. NAMES ─────────────── */
  names: {
    him: "abimaa",            // ← HIS name / nickname
    me:  "sanuuu",       // ← YOUR name / nickname (used in the footer + letter)
  },

  /* ─────────────── 2. HERO (the first screen) ─────────────── */
  hero: {
    title:    "happy boyfriend's day to my best one in the whole world ❤️",   // {him} becomes his name
    subtitle: "look what i made for you.",
    button:   "open maaduu♡",
    hint:     "(psst… it's a little shy, tap it)",
  },

  /* ─────────────── 3. RELATIONSHIP DATE + IMPORTANT DATES ───────────────
     Date format is always  YYYY-MM-DD  (year-month-day).                   */
  relationshipDate: "2026-01-14",            // ← the day you became "us"
  counterLabel: "we've been us for",         // text above the day counter

  importantDates: [
    // yearly: true  → counts down to the next time it happens (anniversaries, birthdays)
    { emoji: "💍", label: "the day we became us",  date: "2026-01-14", yearly: true },
    { emoji: "🎂", label: "the day my favorito was born",     date: "2003-08-10", yearly: true },
    { emoji: "🌙", label: "our beginning",   date: "2026-01-07", yearly: false },
    // ← add more dates here
  ],


      /* ─────────────── 5. THINGS I LOVE ABOUT YOU (cards) ───────────────
     emoji: any emoji you like.
     sticker: "mochi" (the dark mascot), "puff" (the white mascot) or "none".
              Leave the sticker line out to let the site decide.            */
  loves: {
    kicker:   "a very long list",
    title:    "things I love about you",
    subtitle: "(I could keep going, but the page would never end.)",
    items: [
      { emoji: "😂", title: "Your laugh",         text: "the laugh that makes my heart dance." },
      { emoji: "🫶", title: "How you care",       text: "you make me feel loved in ways that you dont even realize." },
      { emoji: "✨", title: "Your weirdness",     text: "your heart, your way of loving, your adorable teeth smiles, your seductive side, your goofiness, your voices, your snores and those witch laughters." },
      { emoji: "🏡", title: "Home with you",      text: "you make me feel safe, understood, and completely myself.", sticker: "puff" },
      { emoji: "🔥", title: "That smirk",         text: "Placeholder: yes, THAT one. You know the one that makes your eyes crinkle and light up.", sticker: "mochi" },
      { emoji: "🌷", title: "How you hype me",    text: "Placeholder: the way you believe in me even when I don't." },
      // ← add as many cards as you want
    ],
  },

  /* ─────────────── 5. INSIDE JOKES (sticky notes) ─────────────── */
  jokes: {
    kicker:   "classified information",
    title:    "our inside jokes",
    subtitle: "if you know, you know 🤫",
    items: [
      { title: "the accidental GC",  text: "valentine's midnight, just us laughing + entire ACE." },
      { title: "\"our backup plan\"",     text: "momo sellers, just in case." },
      { title: "no place is safe",         text: "bus, train, dio, office, lunch...apparently no place is safe from me." },
      // ← add more
    ],
  },

  /* ─────────────── 6. MEMORY WALL (polaroids) ───────────────
     1. Put your photos inside the "photos" folder.
     2. Write the file name here:  image: "photos/us-at-the-beach.jpg"
        (or paste a full https:// image link)
     3. Leave image: "" to show a cute "your photo here" placeholder.
     sticker: "mochi", "puff" or "none" (optional).                         */
  memories: {
    kicker:   "scrapbook",
    title:    "our memory wall",
    subtitle: "tap a photo to see it bigger.",
    photos: [
      { image: "C:\\Users\\Hello\\Documents\\white outfit.jpeg", caption: "us" },
      { image: "C:\\Users\\Hello\\Documents\\grey.jpeg", caption: "your favorite photo of me" },
      { image: "C:\\Users\\Hello\\Documents\\mmo.jpeg", caption: "our sweet memory" },
   
    ],
  },

  /* ─────────────── 8. OPEN WHEN… 💌 ───────────────
     The envelope says:  "Open when" + label.                                */
  openWhen: {
    kicker:   "tiny letters",
    title:    "open when… 💌",
    subtitle: "tap an envelope. one at a time, or all at once, I'm not the boss of you.",
    prefix:   "Open when",
    letters: [
      { label: "you miss me",
        message: "I'm right here, even when I'm not. Close your eyes, think of my glass wiping laughters, and know I'm thinking of you too. ♡" },
      { label: "you're sad",
        message: "Hey. Breathe. You are so loved, I'm here with you through it all. . I'm proud of you, always. Call me. 🫂" },
      { label: "you can't sleep",
        message: "Placeholder: Put the phone down (after you read this), take a deep breath, and imagine me next to you, holding you so close and tight to my chest. Rest your little head on your bubu and Sleep well, Kanna. 🌙" },
      { label: "you need a reminder that I love you",
        message: "Placeholder: I love you. Today, tomorrow, and on the days you forget. That's the whole message. ❤️" },
      { label: "you want to smile",
        message: "Placeholder: remember the times we laugh at nothing till our eyes burn, the times we play games together, you ragebaiting me and do that witch laughs HAHA 😭" },
      // ← add more envelopes
    ],
  },

  /* ─────────────── 9. OUR SONG ───────────────
     audio:  a file in the "photos" folder (e.g. "photos/our-song.mp3")
             OR a direct link that ends in .mp3 / .m4a.
             Leave "" if you don't have it yet.
     spotifyEmbed: (optional) Spotify → Share → Embed → copy the src="..." link
                   e.g. "https://open.spotify.com/embed/track/XXXXXXXX"
     The song never plays by itself — he has to press play. ♡                */
  song: {
    kicker:   "on repeat",
    title:    "our song",
    subtitle: "press play when you're ready.",
    name:     "Perfect",
    artist:   "Ed sheeran",
    cover:    "C:\\Users\\Hello\\Documents\\us.jpeg",              // image path or link, "" = cute vinyl
    spotifyEmbed: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v?si=FMRDW9reS2WIsgpNOjHx0Q&utm_source=whatsapp",          // ← optional
    note:     "i knew we were perfect since the first time we heard this in our jam",
  },

  /* ─────────────── 10. MY LETTER TO YOU ───────────────
     Each "quoted line" is one paragraph. Add as many as you like.           */
  letter: {
    kicker:   "for my little baby",
    title:    "a letter to you",
    greeting: "Abimaa,",
    body: [
      " i love you, i love you, i love you so much. happy first boyfriend's day to my bestestststtso man that i have ever been with, a man whom i can finally choose as my husband (i already chose in 10 days bop bop) a man who sees me through myself, a man who knows to love, care, deeply respect, admire and communicate even through the confusing days and the days that we do not know even us. i cannot be much grateful to you more than how deeply you're into me through all those bad demonic days, i do not know someone choose me this constantly even after i showed him how much a bad demon could catch me HAHA, i didn't knew this feeling of being loved and appreciated for being myself before u have stepped into my life, thank you kanna, i know ive said this for a million times but i can literally say this to u every fresh minute u pop up into my heart, LIKE MAN, you're really something magical. the magic that changed everything for me. a kind of miracle that makes me rewrite everything i knew about love. a dream that i get to live everyday. in a world that can feel so heavy and ordinary, you're the light who makes everything feel a little softer, a little brighter, and infinitely more beautiful. the way u love me makes me feel like i got the luckiest ending for my life that i never even knew to ask for. i wouldn't talk to my babies about fairytales and spells, i'd just talk about u. i look at you and know without a single doubt that you're the best thing that have ever happened to me. i really love u so much, Abhiram,",
      "for the millions time i say thank you to you, i'd say sorry just as many--im sorry for everything that ive done for my immaturity and lack of communication skills HAHA, im sorry for making things hard for u sometimes, im sorry for failing in the way that i care about u in the ways u care about u, im sorry for putting u up through hard days when life is already being hard for u, im so sorry. i know that you'll forgive me even if i don't apologise for all of this, because ik how soft and kind you're to everyone, stay sweet and gentle with everyone as you're now, always be loving and happy with everyone around u hehe. i'll always wish u the best throughout ur life, so that i can make a great homemaker for my sweetest husband sksksksk. goodluck babyma for everything that have to come in your life, for everything that you've to work for and achieved to be, may u become everything that you've always been wished for and stay as pleasantly successful young man forever hehe but but you gonna be my cute little babypie however u grow up to the mountains hehe, the little baby that'd be sleeping in my arms with my warmth and your softest breaths. YOURE LITERALLY THE CUTEST CREATURE TO EXIST ON THIS DUMBASS LITTLE PLANET HAHAHAHAHHA I LOVE YOU MWAHHH !!!",

    ],
    signoff: "forever yours,",
    signature: "sananananana♡",
  },

  /* ─────────────── 11. FINAL SURPRISE ─────────────── */
  finale: {
    kicker:  "last one, I promise",
    button:  "there's one more thing…",
    title:   "I love you, Abhiram.",
    message: [
      "Stay as my most handsome, hottest, sexiest man. I'll marry you and make babies with you and live my happily ever after.",
      "HAPPY HAPPY BOYFRIEND'S DAY TO MY BEST ONE. ❤️",
    ],
    signoff: "— sanumaa",
  },

  /* ─────────────── 12. FOOTER ─────────────── */
  footer: {
    text: "made with way too much love (and a few snacks) by sanucutuuu",
    small: "for my sweetest loving boyfriend, always.",
  },

  /* ─────────────── 13. EXTRAS ───────────────
     Set enabled: false if you ever want the little mascots hidden.          */
  mascots: { enabled: true },
};
