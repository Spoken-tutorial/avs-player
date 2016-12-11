function syncAudioVideo(videoId, audioId) {
    // Storing video & audio IDs
    this.videoId = videoId;
    this.audioId = audioId;
    this.videoObj  = '#'+this.videoId;
    console.log(this.videoObj);
    this.videoWidth = $(this.videoObj).attr('width');
    this.videoHeight = $(this.videoObj).attr('height');
    this.videoParent = '#' + this.videoId + '-avplayer-js';
    $(this.videoObj).addClass('avs-tech');
    
    /* parent div */
    $(this.videoObj).wrap( '<div id="'+this.videoId+'-avplayer-js" class="avplayer-js avs-default-skin avs-paused avs-controls-enabled" style="width: '+this.videoWidth+'px; height: '+this.videoHeight+'px;">');

    /* video poster */
    $(this.videoParent).append('<div class="avs-poster avs-hidden" tabindex="-1"></div>');
    
    this.posterImage = $(this.videoObj).attr('poster');
    if(this.posterImage != undefined) {
        $('.avs-poster').css('background-image', 'url("' + this.posterImage + '");');
    }

    /* add subtitle track */
    var track = '<div class="avs-text-track-display"><div class="avs-captions" style="display: block;"><div class="avs-tt-cue"><div id="'+this.videoId+'-srt" style="display: none; margin: 0px;">';
    var subOptions = '';
    $(this.videoObj+' track').each(function() {
        //console.log($(this).attr('label'));
        track += '<div class="srt avs-text-track" id="'+videoId+'-'+$(this).attr('label').toLowerCase()+'" data-video="'+videoId+'" data-srt="'+$(this).attr('src')+'" style="display:none;"></div>';
        subOptions +='<li id="'+$(this).attr('label')+'" class="'+videoId+'-menu-item avs-menu-item" role="button" aria-live="polite" tabindex="0" aria-selected="false">'+$(this).attr('label')+'</li>';
        $(this).remove();
    });
    track += '</div></div></div></div>';
    $(this.videoParent).append(track);

    /* loading spinner */
    $(this.videoParent).append('<div class="avs-loading-spinner avs-hidden"></div>');

    /* play big button */
    $(this.videoParent).append('<button id="'+this.videoId+'-big-play-button" class="avs-big-play-button" role="button" type="button" aria-live="polite" tabindex="0" aria-label="play video"><span class="avs-control-text">Play Video</span></button>');

    /* add control bar parent */
    $(this.videoParent).append('<div class="avs-control-bar" id="'+this.videoId+'-control-bar"></div>');
    
    playBar = $('#'+this.videoId+'-control-bar');

    /* add paly button */
    $(playBar).append('<button id="'+this.videoId+'-play-control" class="avs-play-control avs-control avs-button  avs-paused" tabindex="0" role="button" type="button" aria-live="polite"><span class="avs-control-text">Play</span></button>');

    /* Volume control */
    $(playBar).append('<div class="avs-mute-control avs-volume-menu-button avs-menu-button avs-menu-button-inline avs-control" id="'+this.videoId+'-mute-control" role="button" aria-live="polite" tabindex="0"><span class="avs-control-text">Mute</span><div class="avs-menu"><div class="avs-menu-content"><div role="slider" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" tabindex="0" id="'+this.videoId+'-volume-bar" class="avs-volume-bar avs-slider-bar avs-slider avs-slider-horizontal" aria-label="volume level" aria-valuetext="100%"><div class="avs-volume-level" id="'+this.videoId+'-volume-level" style="width: 100%;"><span class="avs-control-text"></span></div><div class="avs-volume-handle avs-slider-handle" id="'+this.videoId+'-volume-handle" style="left: 96%;"><span class="avs-control-text">00:00</span></div></div></div></div></div>');

    /* Volume control 
    $(playBar).append('<div class="avs-volume-control avs-volume-menu-button avs-menu-button avs-menu-button-inline avs-control avs-button avs-volume-menu-button-horizontal avs-vol-3"><div role="slider" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" tabindex="0" id="'+this.videoId+'-volume-bar" class="avs-volume-bar avs-slider" aria-label="volume level" aria-valuetext="100%"><div class="avs-volume-level" id="'+this.videoId+'-volume-level" style="width: 100%;"><span class="avs-control-text"></span></div><div class="avs-volume-handle avs-slider-handle" id="'+this.videoId+'-volume-handle" style="left: 96%;"><span class="avs-control-text">00:00</span></div></div></div>');*/

    /* progress control bar */
    $(playBar).append('<div class="avs-progress-control avs-control" id="'+this.videoId+'-progress-holder"><div role="slider" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" tabindex="0" class="avs-progress-holder avs-slider avs-slider-horizontal" aria-label="video progress bar" aria-valuetext="" style="width: 100%"><div class="avs-load-progress" style="width: 0%;"><span class="avs-control-text">Loaded: 0%</span></div><div class="avs-play-progress avs-slider-bar" style="width: 0%;" id="'+this.videoId+'-play-progress" data-current-time="00:00"><span class="avs-control-text">Progress: 0%</span></div><div class="avs-seek-handle avs-video-slider-handle" id="'+this.videoId+'-seek-handle" style="left: 0%;"><span class="avs-control-text">00:00</span></div></div></div>');

    /* display current time */
    $(playBar).append('<div class="avs-current-time avs-time-control avs-control"><div class="avs-current-time-display" id="'+this.videoId+'-current-time-display" aria-live="off">0:00</div></div>');
    /* divider */
    $(playBar).append('<div class="avs-time-divider"><span>/</span></div>');
    
    /* video duration */
    $(playBar).append('<div class="avs-duration avs-time-control avs-control"><div class="avs-duration-display" id="'+this.videoId+'-duration-display" aria-live="off">0:00</div></div>');
    
    /* video duration */
    $(playBar).append('<div class="avs-remaining-time avs-time-control avs-control"><div class="avs-remaining-time-display" aria-live="off"><span class="avs-control-text">Remaining Time </span>-0:00</div></div>');

    /* subtitle menu button */
    /*$(playBar).append('<div class="avs-chapters-button avs-menu-button avs-control " role="button" aria-live="polite" tabindex="0" style="display: none;" aria-haspopup="true" aria-label="Chapters Menu"><div class="avs-control-content"><span class="avs-control-text">Chapters</span></div><div class="avs-menu"><ul class="avs-menu-content"><li class="avs-menu-title">Chapters</li></ul></div></div>');*/
    
    /* subtitle menu */
    subMenu = '<div class="avs-captions-button avs-menu-button avs-control avs-workinghover avs-menu-button-popup" role="button" aria-live="polite" tabindex="0" aria-haspopup="true"><div class="avs-control-content"><span class="avs-control-text">Captions</span></div><div class="avs-menu"><ul class="avs-menu-content">';
    
    subMenu +='<li class="'+this.videoId+'-menu-item avs-menu-item avs-selected" id="'+this.videoId+'-srt-off" role="button" aria-live="polite" tabindex="0" aria-selected="true">Caption off</li>';
    subMenu += subOptions;
    subMenu += '</ul></div></div>';
    $(playBar).append(subMenu);

    /* fullScreen control */
    $(playBar).append('<div class="avs-fullscreen-control avs-control " id="'+this.videoId+'-fullscreen-control" role="button" aria-live="polite" tabindex="0"><div class="avs-control-content"><span class="avs-control-text">Fullscreen</span></div></div>');

    new bigPlayButton(this.videoObj, this.videoId, this.audioId);
}

function bigPlayButton(videoObj, videoId, audioId) {
    this.videoObj = videoObj;
    this.videoId = videoId;
    this.audioId = audioId;
    this.timeInterval = 0;
    
    $(this.videoObj+'-big-play-button').click(function(){
        $('.avs-loading-spinner').removeClass("avs-hidden");
        audio = document.getElementById(audioId);
        video = document.getElementById(videoId);
        audio.volume = 1;
        video.volume = 0;
        video.preload = "auto";
        audio.preload = "auto";
        var intervarId = setInterval(
            function () {
                audio = document.getElementById(audioId);
                video = document.getElementById(videoId);
                if(audio.readyState === 4 && video.readyState === 4) {
                    clearInterval(intervarId);
                    new initializeControls(videoId, audioId);
                    $('.avs-loading-spinner').addClass("avs-hidden");
                    video.play();
                    setTimeout(function(){
                        $('#'+videoId+'-avplayer-js').addClass('avs-user-inactive');
                    }, 5000);
                    setInterval(timerIncrement, 1000);
                }
            }, 
        10);
        
        function timerIncrement() {
            timeInterval += 1;
            if(timeInterval > 5) {
                $('#'+videoId+'-avplayer-js').addClass('avs-user-inactive');
                $('#'+videoId+'-avplayer-js').removeClass('avs-user-active');
                timeInterval = 0;
            }
        }
        
        $(videoObj+'-avplayer-js').removeClass('avs-paused');
        $(videoObj+'-avplayer-js').addClass('avs-controls-enabled avs-has-started avs-playing');
        $('#'+videoId+'-play-control').removeClass("avs-paused");
        $('#'+videoId+'-play-control').addClass("avs-playing");
        function initializeControls(videoId, audioId) {
            this.videoId = videoId;
            this.audioId = audioId;

            // initializing audio & video object
            audio = document.getElementById(this.audioId);
            video = document.getElementById(this.videoId);
            video.volume = 0;
            audio.volume = 1;
            
            //initializing flags
            var paused = false;
            var seeked = false;
            var seeking = false;
            var videoIsFullScreen = false;
            var videoWidth = video.width;
            var videoHeight = video.height;
            var videoDuration = video.duration;
            var audioDuration = audio.duration;
            var maxDurationId = videoId;
            var maxDurationObj = video;
        
            if(audioDuration > videoDuration) {
                maxDurationObj = audio;
                maxDurationId = audioId;
            }
            
            //initializing player control objects
            var currentTimeUpdate = $('#'+this.videoId + '-current-time-display');
            var playProgress = $('#'+this.videoId+'-play-progress');
            var seekHandle = $('#'+this.videoId+'-seek-handle');
            var playControl = $('#'+this.videoId+'-play-control');
            
            // update total video duration
            $('#'+this.videoId+'-duration-display').html(secondstotime(Math.floor(maxDurationObj.duration)));
            
            // play button
            $('#'+this.videoId+'-play-control').click(function() {
                var parentDiv = $('#'+videoId+'-avplayer-js');
                audio = document.getElementById(audioId);
                video = document.getElementById(videoId);
                if(video.paused) {
                    video.play();
                    paused = false;
                    parentDiv.addClass("avs-playing");
                    parentDiv.removeClass("avs-paused");
                    $(this).addClass("avs-playing");
                    $(this).removeClass("avs-paused");
                }else {
                    video.pause();
                    paused = true;
                    parentDiv.addClass("avs-paused");
                    parentDiv.removeClass("avs-playing");
                    $(this).addClass("avs-paused");
                    $(this).removeClass("avs-playing");
                }
            });
            
            // mouse leave from video
            $('#'+videoId+'-avplayer-js').mouseleave(function(){
                timeInterval = 4;
            });
            
            // mouseover on video
            $('#'+videoId+'-avplayer-js').mouseover(function(){
                $(this).addClass('avs-user-active');
                $(this).removeClass('avs-user-inactive');
                timeInterval = 0;
            });
            
            // mousemove on video
            $('#'+videoId+'-avplayer-js').mousemove(function(){
                $(this).addClass('avs-user-active');
                $(this).removeClass('avs-user-inactive');
                timeInterval = 0;
            });
            
            //video click event
            $('#'+this.videoId).click(function() {
                audio = document.getElementById(audioId);
                video = document.getElementById(videoId);
                if(paused){
                    video.play();
                    paused = false;
                    $('#'+videoId+'-avplayer-js').addClass("avs-playing");
                    $('#'+videoId+'-avplayer-js').removeClass("avs-paused");
                    $('#'+videoId+'-play-control').addClass("avs-playing");
                    $('#'+videoId+'-play-control').removeClass("avs-paused");
                }else {
                    video.pause();
                    paused = true;
                    $('#'+videoId+'-avplayer-js').addClass("avs-paused");
                    $('#'+videoId+'-avplayer-js').removeClass("avs-playing");
                    $('#'+videoId+'-play-control').addClass("avs-paused");
                    $('#'+videoId+'-play-control').removeClass("avs-playing");
                }
            });
            
            //when the video plays
            video.addEventListener('play', function() {
                //if the audio is paused, play that too
                if(audio.paused && !seeking) {
                    audio.play();
                }
            }, false);
    
            //when the video pauses
            video.addEventListener('pause', function() {
                //if the audio isn't paused, pause that too
                if(!audio.paused && (videoDuration != video.currentTime)) {
                    audio.pause();
                }
            }, false);
            
            // seeking event
            video.addEventListener('seeking', function() {
                seeking = true;
                $('.avs-loading-spinner').removeClass("avs-hidden");
                if(!paused)
                    audio.pause();
            });
            
            //seeked event
            video.addEventListener('seeked', function() {
                seeked = true;
                seeking = false;
                $('.avs-loading-spinner').addClass("avs-hidden");
                var percent = this.buffered.end(this.buffered.length - 1) / this.duration * 100;
                $('.avs-load-progress').css("width", percent+"%");  
            });
            
            //subtitle enable/disable
            $('.' + this.videoId + '-menu-item').each(function(i) {
                $(this).click(function() {
                    $(this).parent().children().each(function(i) {
                        $(this).removeClass("avs-selected");
                    });
                    $(this).addClass("avs-selected");
                    subid = $(this).html();
                    $('#' + videoId + '-srt').children().each(function(i) {
                        $(this).css("display", 'none');
                    });
                    subid = subid.toLowerCase();
                    if(subid != "caption off") {
                        $('#' + videoId + '-srt').css("display", 'block');
                        $('#'+videoId+'-'+subid).css("display", 'inline-block');
                    }else {
                        $('#' + videoId + '-srt').css("display", 'none');
                        $('#'+videoId+'-'+subid).css("display", 'none');
                    }
                });
            });
            
            //when the video buffers
            video.addEventListener('progress', function() {
                var percent = this.buffered.end(this.buffered.length - 1) / this.duration * 100;
                $('.avs-load-progress').css("width", percent+"%");
            });
            
            //when the video time is updated
            video.addEventListener('timeupdate', function() {
                audio = document.getElementById(audioId);
                video = document.getElementById(videoId);
                
                // if the audio has sufficiently loaded
                if(audio.readyState >= 4) {
                    //if the audio and video times are different,
                    //update the audio time to keep it in sync
                    if(Math.ceil(audio.currentTime) > Math.ceil(video.currentTime) && videoDuration != video.currentTime) {
                        audio.currentTime = video.currentTime;
                    }
                    if(currentTimeUpdate) {
                        currentTimeUpdate.html(secondstotime(Math.floor(video.currentTime)));
                        $('.avs-remaining-time-display').html('-'+secondstotime(Math.floor(maxDurationObj.duration) - Math.floor(video.currentTime)));
                        $('#'+videoId+'-play-progress').attr('data-current-time', currentTimeUpdate.html());
                    }
                    if(seeked && !paused) {
                        audio.play();
                        seeked = false;
                    }
                    var videoPrgressBarWidth  = (video.currentTime / maxDurationObj.duration) * 100;
                    playProgress.css("width", videoPrgressBarWidth+"%");
                    if(videoPrgressBarWidth > 0.6) {
                        seekHandle.css("left", (videoPrgressBarWidth-0.6)+"%");
                    }
                    if(Math.floor(video.currentTime) < 0.6) {
                        seekHandle.css("left", "0%");
                    }
                    if(secondstotime(Math.floor(video.currentTime)) == secondstotime(Math.floor(maxDurationObj.duration))) {
                        setTimeout(
                            function () {
                                paused = true;
                                $('#'+videoId+'-avplayer-js').addClass("avs-paused");
                                $('#'+videoId+'-avplayer-js').removeClass("avs-playing");
                                $('#'+videoId+'-play-control').addClass("avs-paused");
                                $('#'+videoId+'-play-control').removeClass("avs-playing");
                            }
                        , 900);
                    }
                }
            }, false);
    
            //when the audio time is updated
            audio.addEventListener('timeupdate', function()    {
                audio = document.getElementById(audioId);
                video = document.getElementById(videoId);
                
                // if the audio has sufficiently loaded
                if(video.readyState >= 4 && audio.readyState >= 4) {
                    if(currentTimeUpdate && videoDuration == video.currentTime) {
                        currentTimeUpdate.html(secondstotime(Math.floor(audio.currentTime)));
                        $('.avs-remaining-time-display').html('-'+secondstotime(Math.floor(maxDurationObj.duration) - Math.floor(video.currentTime)));
                        $('#'+videoId+'-play-progress').attr('data-current-time', currentTimeUpdate.html());
                        var videoPrgressBarWidth  = (audio.currentTime / maxDurationObj.duration) * 100;
                        playProgress.css("width", videoPrgressBarWidth+"%");
                        if(videoPrgressBarWidth > 0.6) {
                            seekHandle.css("left", (videoPrgressBarWidth-0.6)+"%");
                        }
                        if(Math.floor(video.currentTime) < 0.6) {
                            seekHandle.css("left", "0%");
                        }
                        if(secondstotime(Math.floor(audio.currentTime)) == secondstotime(Math.floor(maxDurationObj.duration))) {
                            setTimeout(
                                function () {
                                    paused = true;
                                    $('#'+videoId+'-avplayer-js').addClass("avs-paused");
                                    $('#'+videoId+'-avplayer-js').removeClass("avs-playing");
                                    $('#'+videoId+'-play-control').addClass("avs-paused");
                                    $('#'+videoId+'-play-control').removeClass("avs-playing");
                                }
                            , 900);
                        }
                    }
                }
            }, false);
            
            volumeControl = document.getElementById(this.videoId + '-volume-bar');
            volumeControl.addEventListener("mousedown", function(){
                if(!audio.muted) {
                    document.onmousemove = function(e) {
                        setVolume(e.pageX, audioId, videoId);
                    }
                    document.onmouseup = function() {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    }
                }
            }, false);

            volumeControl.addEventListener("mouseup", function(e){
                if(!audio.muted) {
                    setVolume(e.pageX, audioId, videoId);
                }
            }, false);
            
            $('#'+this.videoId+'-volume-bar').click(function(e) {
                e.stopPropagation();
                return false;
            });
            
            $('.avs-menu').click(function(e) {
                e.stopPropagation();
                return false;
            });
            
            // mute button
            $('#'+this.videoId+'-mute-control').click(function() {
                audio = document.getElementById(audioId);
                var volumeLevel = $('#'+videoId+'-volume-level');
                var volumeHandle = $('#'+videoId+'-volume-handle');
                if(audio.muted) {
                    audio.muted = false;
                    $(this).removeClass("avs-vol-0");
                    volNum = Math.floor(audio.volume / 1 * 100);
                    volumeLevel.css("width", volNum + '%');
                    volNum = Math.floor(audio.volume / 1 * 96);
                    volumeHandle.css("left", volNum + '%');
                }else {
                    $(this).addClass("avs-vol-0");
                    audio.muted = true;
                    volumeLevel.css("width", '1%');
                    volumeHandle.css("left", '0%');
                }
            });
            
            function setVolume(clickX, audioId, videoId) {
                this.audioId = audioId;
                this.videoId = videoId;
                audio = document.getElementById(this.audioId);
                var newVol = (clickX - findPosX(volumeControl)) / volumeControl.offsetWidth;
                if (newVol > 1) {
                    newVol = 1;
                } else if (newVol < 0) {
                    newVol = 0;
                }
                audio.volume = newVol;
                updateVolumeDisplay(this.audioId, this.videoId);
            }
    
            function updateVolumeDisplay(audioId, videoId){
                this.videoId = videoId;
                this.audioId = audioId;
                audio = document.getElementById(this.audioId);
                var volumeLevel = $('#'+this.videoId+'-volume-level');
                var volumeHandle = $('#'+videoId+'-volume-handle');
                var volNum = Math.floor(audio.volume / 1 * 100);
                volumeLevel.css("width", volNum + '%');
                volNum = Math.floor(audio.volume / 1 * 96);
                volumeHandle.css("left", volNum + '%');
            }
            
            function findPosX(obj) {
                var curleft = obj.offsetLeft;
                while(obj = obj.offsetParent) {
                    curleft += obj.offsetLeft;
                }
                return curleft;
            }
            
            // mousemove eventHandler for video
            var playTrack = document.getElementById(this.videoId + '-progress-holder');
            playTrack.addEventListener('mousedown', function (e) {
                setPlayProgress(e.pageX, videoId, audioId, maxDurationId);
                document.onmousemove = function(e) {
                    setPlayProgress(e.pageX, videoId, audioId, maxDurationId);
                }
                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }, true);

            playTrack.addEventListener("mouseup", function(e){
                setPlayProgress(e.pageX, videoId, audioId, maxDurationId);
            }, true);
            
            function setPlayProgress(clickX, videoId, audioId, maxDurationId) {
                this.videoId = videoId;
                this.audioId = audioId;
                this.maxDurationId = maxDurationId;
                
                audio = document.getElementById(this.audioId);
                video = document.getElementById(this.videoId);
                maxDurationObj = document.getElementById(this.maxDurationId);
                
                videoDuration = video.duration;
                audioDuration = audio.duration;
                
                playTrack = document.getElementById(this.videoId + '-progress-holder');
                playProgress = $('#'+this.videoId+'-play-progress');
                seekHandle = $('#'+videoId+'-seek-handle');
                
                newPercent = Math.max(0, Math.min(1, (clickX - findPosX(playTrack)) / playTrack.offsetWidth));
                videoPrgressBarWidth = newPercent * 100;
                
                playProgress.css("width", videoPrgressBarWidth+"%");
                
                if(videoPrgressBarWidth > 0.6) {
                    seekHandle.css("left", (videoPrgressBarWidth-0.6)+"%");
                }
                
                if(Math.floor(video.currentTime) < 0.6) {
                    seekHandle.css("left", "0%");
                }
                
                var tmpTime = newPercent * maxDurationObj.duration;
                
                if(tmpTime <= videoDuration) {
                    video.currentTime = tmpTime;
                }else {
                    video.currentTime = videoDuration;
                }
                
                if(tmpTime <= audioDuration) {
                    audio.currentTime = tmpTime;
                }else {
                    audio.currentTime = audioDuration;
                }
            }
            new fullScreenHandle(this.videoId, this.videoHeight, this.videoWidth);
            //funscreen handle
            function fullScreenHandle(videoId, videoHeight, videoWidth) {
                this.videoId = videoId;
                this.videoHeight = videoHeight;
                this.videoWidth = videoWidth;
                window.fullScreenApi = fullScreenAPI();
                if (window.fullScreenApi.supportsFullScreen) {
                    // handle button click
                    document.getElementById(this.videoId+'-fullscreen-control').addEventListener("click", function() {
                        video = document.getElementById(videoId);
                        if (fullScreenApi.isFullScreen()) {
                            window.fullScreenApi.cancelFullScreen(video.parentNode);
                            fullScreenOff();
                        }else {
                            window.fullScreenApi.requestFullScreen(video.parentNode);
                            fullScreenOn(videoId);
                        }
                    });

                    video.parentNode.addEventListener(fullScreenApi.fullScreenEventName, function() {
                        if (!fullScreenApi.isFullScreen()) {
                            fullScreenOff();
                        }
                    }, true);
            
                    document.onfullscreenchange = function(event) {
                        if (!fullScreenApi.isFullScreen()) {
                            fullScreenOff();
                        }
                    }
                    document.onmozfullscreenchange = function(event) {
                        if (!fullScreenApi.isFullScreen()) {
                            fullScreenOff();
                        }
                    }
                    document.onwebkitfullscreenchange = function(event) {
                        if (!fullScreenApi.isFullScreen()) {
                            fullScreenOff();
                        }
                    }
                }else{
                    document.getElementById(this.videoId+'-fullscreen-control').addEventListener("click", function() {
                        video = document.getElementById(videoId);
                        if (!videoIsFullScreen) {
                            video.parentNode.style.width = '100%';
                            video.parentNode.style.height = '100%';
                            fullScreenOn(videoId);
                        } else {
                            video.parentNode.style.width = videoWidth + 'px';
                            video.parentNode.style.height = videoHeight + 'px';
                            fullScreenOff();
                        }
                    });
                }
            }
            function fullScreenOn(videoId) {
                this.videoId = videoId;
                video = document.getElementById(this.videoId);
                videoIsFullScreen = true;
                video.style.width = "100%";
                video.style.height = "100%";
                // video.style.position = "fixed";
                video.style.left = 0;
                video.style.top = 0;
                $('#' + this.videoId + '-avplayer-js').addClass("avs-fullscreen");
            }
    
            function fullScreenOff() {
                video = document.getElementById(this.videoId);
                videoIsFullScreen = false;
                video.parentNode.style.width = this.videoWidth + 'px';
                video.parentNode.style.height = this.videoHeight + 'px';
                video.style.width = this.videoWidth + "px";
                video.style.height = this.videoHeight + "px";
                // video.style.position = "static";
                $('#' + this.videoId + '-avplayer-js').removeClass("avs-fullscreen");
            }
        }
        
        $('.srt').each(function() {
            var subtitleElement = $(this);
            var videoSrtId = subtitleElement.attr('data-video');
            if(!videoSrtId) return;
            var srtUrl = subtitleElement.attr('data-srt');
            if(srtUrl) {
                $(this).load(srtUrl, function (responseText, textStatus, req) { playSubtitles(subtitleElement)})
            } else {
                playSubtitles(subtitleElement);
            }
        });
    });
}

// Fullscreen API
function fullScreenAPI() {
    var fullScreenApi = { 
            supportsFullScreen: false,
            isFullScreen: function() { return false; }, 
            requestFullScreen: function() {}, 
            cancelFullScreen: function() {},
            fullScreenEventName: '',
            prefix: ''
        },
        browserPrefixes = 'webkit moz o ms khtml'.split(' ');

    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
        fullScreenApi.supportsFullScreen = true;
    } else {     
        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
            fullScreenApi.prefix = browserPrefixes[i];

            if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
                fullScreenApi.supportsFullScreen = true;
    
                break;
            }
        }
    }

    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

        fullScreenApi.isFullScreen = function() {
            switch (this.prefix) {    
                case '':
                    return document.fullScreen;
                case 'webkit':
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + 'FullScreen'];
            }
        }
        fullScreenApi.requestFullScreen = function(el) {
            return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
        }
        fullScreenApi.cancelFullScreen = function(el) {
            return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
        }        
    }

    // jQuery plugin
    if (typeof jQuery != 'undefined') {
        jQuery.fn.requestFullScreen = function() {

            return this.each(function() {
                var el = jQuery(this);
                if (fullScreenApi.supportsFullScreen) {
                    fullScreenApi.requestFullScreen(el);
                }
            });
        };
    }
    return fullScreenApi;
}

function secondstotime(vidTime) {
    // calculating hours
    var hours = Math.floor(vidTime / 3600);
    vidTime = vidTime - hours * 3600;
    
    // calculating minutes
    var minutes = Math.floor(vidTime / 60);
    
    // calculating seconds
    var seconds = vidTime - minutes * 60;
    if(seconds < 10)
        seconds = "0" + seconds;
    if(hours == 0)
        return minutes + ":" + seconds;
    return hours + ":" + minutes + ":" + seconds;
}

function toSeconds(t) {
    var s = 0.0
    if(t) {
        var p = t.split(':');
        for(i=0;i<p.length;i++)
            s = s * 60 + parseFloat(p[i].replace(',', '.'))
    }
    return s;
}

function strip(s) {
    return s.replace(/^\s+|\s+$/g,"");
}

function playSubtitles(subtitleElement) {
    var videoId = subtitleElement.attr('data-video');
    var srt = subtitleElement.text();
    subtitleElement.text('');
    srt = srt.replace(/\r\n|\r|\n/g, '\n');

    var subtitles = {};
    srt = strip(srt);
    var srt_ = srt.split('\n\n');
    for(s in srt_) {
        st = srt_[s].split('\n');
        if(st.length >=2) {
            n = st[0];
            i = strip(st[1].split(' --> ')[0]);
            o = strip(st[1].split(' --> ')[1]);
            t = st[2];
            if(st.length > 2) {
                for(j=3; j<st.length;j++)
                    t += '\n'+st[j];
            }
            is = toSeconds(i);
            os = toSeconds(o);
            subtitles[is] = {i:i, o: o, t: t};
        }
    }
    var currentSubtitle = -1;
    var ival = setInterval(function() {
        var currentTime = document.getElementById(videoId).currentTime;
        var subtitle = -1;
        for(s in subtitles) {
            if(s > currentTime)
            break
            subtitle = s;
            }
        if(subtitle >= 0) {
            if(subtitle != currentSubtitle) {
                subtitleElement.html(subtitles[subtitle].t);
                currentSubtitle=subtitle;
            } else if(subtitles[subtitle].o < currentTime) {
                subtitleElement.html('');
            }
        }
    }, 100);
}
