import * as React from "react";
import { RangeSlider } from "./range_slider";

export const Player: React.FC = () => {
  const audio = React.useRef<HTMLAudioElement>(null);

  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState([0]);
  const [seekValue, setSeekValue] = React.useState([0]);
  const [isSeeking, setIsSeeking] = React.useState(false);

  const value = React.useMemo(() => {
    if (isSeeking) {
      return seekValue;
    } else {
      return currentTime;
    }
  }, [currentTime, isSeeking, seekValue]);

  const play = React.useCallback(() => audio.current?.play(), [audio]);
  const pause = React.useCallback(() => audio.current?.pause(), [audio]);

  const changeCurrentTime = React.useCallback((value: number) => {
    console.log("changeCurrentTime", value);
    if (audio.current) {
      audio.current.currentTime = value;
    }
  }, []);

  const resetRate = React.useCallback(() => {
    if (audio.current) {
      audio.current.playbackRate = 1;
    }
  }, []);

  const changeRate = React.useCallback(() => {
    if (audio.current) {
      audio.current.playbackRate = audio.current.playbackRate = 2;
    }
  }, []);

  React.useEffect(() => {
    const player = audio.current;

    const onAbort = (event: Event) => {
      // console.log("abort", { el: event.currentTarget });
    };

    const onCanPlay = (event: Event) => {
      // console.log("canplay", { el: event.currentTarget });
    };

    const onCanPlayThrough = (event: Event) => {
      // console.log("canplaythrough", { el: event.currentTarget });
    };

    const onDurationChange = (event: Event) => {
      // console.log("durationchange", { el: event.currentTarget });
      const audioElement = event.currentTarget as HTMLAudioElement;
      setDuration(audioElement.duration);
    };

    const onEmptied = (event: Event) => {
      // console.log("emptied", { el: event.currentTarget });
    };

    const onEnded = (event: Event) => {
      // console.log("ended", { el: event.currentTarget });
    };

    const onError = (event: Event) => {
      // console.log("error", { el: event.currentTarget });
    };

    const onLoadedData = (event: Event) => {
      // console.log("loadeddata", { el: event.currentTarget });
    };

    const onLoadedMetadata = (event: Event) => {
      // console.log("loadedmetadata", { el: event.currentTarget });
    };

    const onLoadStart = (event: Event) => {
      // console.log("loadstart", { el: event.currentTarget });
    };

    const onPause = (event: Event) => {
      // console.log("pause", { el: event.currentTarget });
    };

    const onPlay = (event: Event) => {
      // console.log("play", { el: event.currentTarget });
    };

    const onPlaying = (event: Event) => {
      // console.log("playing", { el: event.currentTarget });
    };

    const onProgress = (event: Event) => {
      // console.log("progress", { el: event.currentTarget });
    };

    const onRateChange = (event: Event) => {
      // console.log("ratechange", { el: event.currentTarget });
    };

    const onSeeked = (event: Event) => {
      // console.log("seeked", { el: event.currentTarget });
    };

    const onSeeking = (event: Event) => {
      // console.log("seeking", { el: event.currentTarget });
    };

    const onStalled = (event: Event) => {
      // console.log("stalled", { el: event.currentTarget });
    };

    const onSuspend = (event: Event) => {
      // console.log("suspend", { el: event.currentTarget });
    };

    const onTimeUpdate = (event: Event) => {
      const audio = event.currentTarget as HTMLAudioElement;
      setCurrentTime(audio.currentTime);
    };

    const onVolumeChange = (event: Event) => {
      // console.log("volumechange", { el: event.currentTarget });
    };

    const onWaiting = (event: Event) => {
      // console.log("waiting", { el: event.currentTarget });
    };

    if (player) {
      // abort Событие вызывается , когда ресурс не был полностью загружен, но не в результате ошибки.
      player.addEventListener("abort", onAbort);
      // canplay Событие вызывается , когда агент пользователя может играть средства массовой информации, но, по оценкам, что не достаточно данных были загружены, чтобы играть средства массовой информации до его конца без остановки для дальнейшей буферизации контента.
      player.addEventListener("canplay", onCanPlay);
      // canplaythrough Событие вызывается , когда агент пользователя может играть средства массовой информации, и оценки , которые были загружены достаточно данных для воспроизведения медиа до его конца без остановки для дальнейшей буферизации контента.
      player.addEventListener("canplaythrough", onCanPlayThrough);
      // durationchange Событие вызывается , когда durationатрибут был обновлен.
      player.addEventListener("durationchange", onDurationChange);
      // emptied Событие вызывается , когда среда становится пустой; например, это событие отправляется, если носитель уже был загружен (или частично загружен) и load()вызывается метод для его перезагрузки.
      player.addEventListener("emptied", onEmptied);
      // ended Событие вызывается , когда воспроизведение или потоковое остановилось , потому что достигнут конец массовой информации или потому , что нет дополнительных данных не имеется.
      player.addEventListener("ended", onEnded);
      // error Событие вызывается , когда ресурс не может быть загружен из - за ошибки (например, проблемы подключения к сети).
      player.addEventListener("error", onError);
      // loadeddata Событие вызывается , когда кадр в текущей позиции воспроизведения средств массовой информации по окончанию загрузки; часто первый кадр.
      player.addEventListener("loadeddata", onLoadedData);
      // loadedmetadata Событие вызывается , когда метаданные были загружены.
      player.addEventListener("loadedmetadata", onLoadedMetadata);
      // loadstart Событие вызывается , когда браузер начал загружать ресурс.
      player.addEventListener("loadstart", onLoadStart);
      // pause Событие отправляется , когда запрос приостановить деятельность осуществляется и деятельность вошла в приостановленное состояние, чаще всего после того, как в средствах массовой информации было приостановлено через вызов элемента pause()метода.
      player.addEventListener("pause", onPause);
      // play Событие вызывается , когда pausedсвойство изменяется от trueдо false, в результате playметода, или autoplayатрибута.
      player.addEventListener("play", onPlay);
      // playing Событие вызывается после того, как воспроизведение первым начало, и всякий раз , когда он будет перезапущен. Например, он срабатывает, когда воспроизведение возобновляется после паузы или задержки из-за отсутствия данных.
      player.addEventListener("playing", onPlaying);
      // progress Событие вызывается периодически как браузер загружает ресурс.
      player.addEventListener("progress", onProgress);
      // ratechange Событие вызывается , когда скорость воспроизведения изменилась.
      player.addEventListener("ratechange", onRateChange);
      // seeked Событие вызывается , когда операция поиска завершена, текущая позиция воспроизведения изменилась, и булево seekingатрибут изменено false.
      player.addEventListener("seeked", onSeeked);
      // seeking Событие вызывается , когда начинаются искать операции, то есть булева seekingатрибут изменен trueи СМИ ищут новую позицию.
      player.addEventListener("seeking", onSeeking);
      // stalled Событие вызывается , когда агент пользователя пытается получать мультимедийные данные, но данные неожиданно не последовало.
      player.addEventListener("stalled", onStalled);
      // suspend Событие вызывается при загрузке мультимедийных данных было приостановлено.
      player.addEventListener("suspend", onSuspend);
      // timeupdate Событие вызывается , когда время , указанное в currentTimeатрибуте было обновлено.
      player.addEventListener("timeupdate", onTimeUpdate);
      // volumechange Событие вызывается , когда объем изменился.
      player.addEventListener("volumechange", onVolumeChange);
      // waiting Событие вызывается , когда воспроизведение остановлено из - за временного отсутствия данных.
      player.addEventListener("waiting", onWaiting);
    }

    return () => {
      if (player) {
        player.removeEventListener("abort", onAbort);
        player.removeEventListener("canplay", onCanPlay);
        player.removeEventListener("canplaythrough", onCanPlayThrough);
        player.removeEventListener("durationchange", onDurationChange);
        player.removeEventListener("emptied", onEmptied);
        player.removeEventListener("ended", onEnded);
        player.removeEventListener("error", onError);
        player.removeEventListener("loadeddata", onLoadedData);
        player.removeEventListener("loadedmetadata", onLoadedMetadata);
        player.removeEventListener("loadstart", onLoadStart);
        player.removeEventListener("pause", onPause);
        player.removeEventListener("play", onPlay);
        player.removeEventListener("playing", onPlaying);
        player.removeEventListener("progress", onProgress);
        player.removeEventListener("ratechange", onRateChange);
        player.removeEventListener("seeked", onSeeked);
        player.removeEventListener("seeking", onSeeking);
        player.removeEventListener("stalled", onStalled);
        player.removeEventListener("suspend", onSuspend);
        player.removeEventListener("timeupdate", onTimeUpdate);
        player.removeEventListener("volumechange", onVolumeChange);
        player.removeEventListener("waiting", onWaiting);
      }
    };
  }, []);
  return (
    <>
      <audio
        ref={audio}
        src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3"
      />
      <div className="w-1/2 bg-violet-500 p-5">
        <div className="flex items-center gap-x-2">
          <button
            type="button"
            onClick={play}
            className="bg-teal-100 px-4 py-2 rounded"
          >
            Play
          </button>
          <button
            type="button"
            onClick={pause}
            className="bg-teal-100 px-4 py-2 rounded"
          >
            Pause
          </button>
          <button onClick={resetRate}>x1</button>
          <button onClick={changeRate}>x1</button>
        </div>
        <span>{currentTime}</span>
        <RangeSlider min={0} max={duration} step={1} value={value} />
        <span>{duration}</span>
      </div>
    </>
  );
};
