showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

/*
Уявіть, що ви створюєте додаток мультимедійного плеєра, який може відтворювати різні типи медіа,  такі як аудіо та відео.
Ваше завдання - реалізувати фасад для мультимедійного плеєра, щоб спростити взаємодію з ним для кінцевого користувача.
 */

enum VideoFileType {
    MP4 = 'mp4',
    AVI = 'avi',
    MKV = 'mkv'
}

enum AudioFileType {
    MP3 = 'mp3',
    WAV = 'wav',
    FLAC = 'flac'
}

class MultimediaPlayer {
    currentMediaIndex: number = 0;
    mediaList: string[] = [];

    play(fileType: VideoFileType | AudioFileType) {
        if (this.isVideo(fileType)) {
            console.log(`Воспроизведение видео формата ${fileType}`);
        } else if (this.isAudio(fileType)) {
            console.log(`Воспроизведение аудио формата ${fileType}`);
        } else {
            console.log(`Неподдерживаемый формат файла: ${fileType}`);
        }
    }

    private isVideo(fileType: VideoFileType | AudioFileType): fileType is VideoFileType {
        return Object.values(VideoFileType).includes(fileType as VideoFileType);
    }

    private isAudio(fileType: VideoFileType | AudioFileType): fileType is AudioFileType {
        return Object.values(AudioFileType).includes(fileType as AudioFileType);
    }

    pause() {
        console.log('Приостановка медиа');
    }

    stop() {
        console.log('Остановка медиа');
    }

    playNextMedia() {
        if (this.mediaList.length === 0) {
            console.log('Плейлист пуст');
            return;
        }

        if (this.currentMediaIndex < this.mediaList.length - 1) {
            this.currentMediaIndex++;
            console.log(`Воспроизведение следующего медиа: ${this.mediaList[this.currentMediaIndex]}`);
        } else {
            console.log('Нет следующего медиа');
        }
    }

    playPreviousMedia() {
        if (this.mediaList.length === 0) {
            console.log('Плейлист пуст');
            return;
        }

        if (this.currentMediaIndex > 0) {
            this.currentMediaIndex--;
            console.log(`Воспроизведение предыдущего медиа: ${this.mediaList[this.currentMediaIndex]}`);
        } else {
            console.log('Нет предыдущего медиа');
        }
    }

    addToPlaylist(media: string) {
        this.mediaList.push(media);
        console.log(`Медиа ${media} добавлено в плейлист`);
    }
}

class MultimediaFacade {
    private multimediaPlayer: MultimediaPlayer;

    constructor() {
        this.multimediaPlayer = new MultimediaPlayer();
    }

    playMedia(fileType: VideoFileType | AudioFileType) {
        this.multimediaPlayer.play(fileType);
    }

    pauseMedia() {
        this.multimediaPlayer.pause();
    }

    stopMedia() {
        this.multimediaPlayer.stop();
    }

    playNextMedia() {
        this.multimediaPlayer.playNextMedia();
    }

    playPreviousMedia() {
        this.multimediaPlayer.playPreviousMedia();
    }

    addToPlaylist(media: string) {
        this.multimediaPlayer.addToPlaylist(media);
    }
}

const playerFacade = new MultimediaFacade();
playerFacade.addToPlaylist('video1.mp4');
playerFacade.addToPlaylist('audio1.mp3');
playerFacade.addToPlaylist('audio2.wav');
playerFacade.addToPlaylist('audio3.flac');
playerFacade.playMedia(VideoFileType.MP4);
playerFacade.playMedia(AudioFileType.MP3);
playerFacade.pauseMedia();
playerFacade.stopMedia();
playerFacade.playNextMedia();
playerFacade.playPreviousMedia();
