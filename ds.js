const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const cd = $('.cd')
const cdwidth = cd.offsetWidth
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const btnplay = $('.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')
const btnnext = $('.btn-next')
const btnprev = $('.btn-prev')
const btnrepeat = $('.btn-repeat')
const btnrandom = $('.btn-random')


const app = {
    currentIndex :  0,
    isPlaying : false,
    isRepeat : false,
    isRandom : false,
    songs: [
        {
          name: "Click Pow Get Down",
          singer: "Raftaar x Fortnite",
          path: "./Doan-Tuyet-Nang-Di-Lofi-Version-Phat-Huy-T4.mp3",
          image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
          name: "Tu Phir Se Aana",
          singer: "Raftaar x Salim Merchant x Karma",
          path: "./Doan-Tuyet-Nang-Di-Lofi-Version-Phat-Huy-T4.mp3",
          image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
          name: "Naachne Ka Shaunq",
          singer: "Raftaar x Brobha V",
          path:
            "https://mp3.filmysongs.in/download.php?id=Naachne Ka Shaunq Raftaar Ft Brodha V Mp3 Hindi Song Filmysongs.co.mp3",
          image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
          name: "Mantoiyat",
          singer: "Raftaar x Nawazuddin Siddiqui",
          path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
          image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
          name: "Aage Chal",
          singer: "Raftaar",
          path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
          image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
          name: "Damn",
          singer: "Raftaar x kr$na",
          path:
            "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
          image:
            "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
      ],

     render : function(){
        const htmls = this.songs.map(function(song){
            return `
            <div class="song ">
            <div class="thumb"
                style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
            `
        })
      $('.playlist').innerHTML = htmls.join('   ')
     },

       handleEvents : function(){
        _this = this;
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newScroll = cdwidth - scrollTop

             cd.style.width = newScroll > 0 ? newScroll +  'px' : 0
             cd.style.opacity = newScroll / cdwidth
        }
       //
      const cdThumbAnimate = cdThumb.animate([
        { 
          transform : 'rotate(360deg)'}
      ],{
        duration : 15000,
        itertions : Infinity
      })


        //
     btnplay.onclick = function(){
       if(_this.isPlaying){
        _this.isPlaying = false
        audio.pause()
        player.classList.remove('playing')
        cdThumbAnimate.pause()
       }
       else{
        _this.isPlaying = true
        audio.play()
        player.classList.add('playing')
        cdThumbAnimate.play()
       }
     }
   //
   audio.ontimeupdate = function(){
    if(audio.duration){
          const durationPefed = Math.floor(audio.currentTime / audio.duration * 100)
          progress.value=durationPefed
    }
   }
   progress.oninput = function(e){
    const seetTime = audio.duration / 100 * e.target.value
    audio.currentTime = seetTime
   }
  //
  btnnext.onclick = function(){
    _this.nextSong()
    audio.play()
    _this.ramdomSong()
  }
  btnprev.onclick = function(){
    _this.prevSong()
    audio.play()
    _this.ramdomSong()
  }

 btnrandom.onclick= function(){
  _this.isRandom = !_this.isRandom
  btnrandom.classList.toggle('active',_this.isRandom)
 }
  //
  btnrepeat.onclick = function(e){
    _this.isRepeat  = !_this.isRepeat
    btnrepeat.classList.toggle('active',_this.isRepeat)
   }
   audio.onended = function(){
    if(_this.isRepeat){
     audio.play() 
    }else{
     btnnext.click()
    }
   }
       },
       
       defineProperties: function(){
         Object.defineProperty(this,'currentSong',{
            get : function(){
                return this.songs[this.currentIndex]
            }
         })
      },
     
     loadcurrentSong : function(){
          heading.textContent = this.currentSong.name
          cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
          audio.src = this.currentSong.path
     },
        
    nextSong : function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadcurrentSong()
    },
    prevSong : function(){
      this.currentIndex--
      if(this.currentIndex < 0){
        this.currentIndex = this.songs.length - 1
      }
      this.loadcurrentSong()
    },
     ramdomSong: function(){
      let newIndex 
      do{
        newIndex = Math.floor(Math.random()*this.songs.length)
      }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadcurrentSong()
     },
      start : function(){
     this.defineProperties();
      this.loadcurrentSong();
      this.handleEvents();
       this.render();
      },
}
app.start()