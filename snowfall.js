class Snowfall {
  constructor(options = {}) {
    // Default base64 encoded snowflake image (white, semi-transparent snowflake)
    const defaultSnowflake =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABiUlEQVRIS+2Vv0sCYRjHv3cHhxoKgiFoOHRwaIiIWlpcWlwcWhoaGlwdGtShoaGhQRD0H4iGiMSlISjovavH3fbeu/N9GRR64EXgcZ73+zzv+z7vPfDeK5RSGuDcAIAeAMzMzBzd3t5+AlAkEvnmer3+AwBKpRLDMDidTlwul+V53tR1/eVyuW6Hw/EIoFQqcTweUavVUK1WUSgUUKlUwGEoimKapjF0Xf9Wq9XuSqXSPYC7u7s/AAbA7e3tH4vFYmvbNnRdR6FQAMdxMJvNaLVasNvt6HQ6FWDgeR4cx0HXdRSLRdRqNQDg9vb2F4BS3wOwWq0oFAqoVqvgeR4cx0HTNPi+D8MwwDDMv8Dh4eEHADc3N38BHMcBx3EwmUyYzWYwmUwwmUyoVqsolUoAgDiOU/V9/+VisXgHoNgdtm1jMplgNpvBarXCarVCuVyGYRgAgMViEcMwAKBer/8H0OV5/u1yuXwH4OnpaQ/AaDR6qtVq74qiyJqmyTzPm6qq/P39/ftWqxUA8N5fX1/fABj+l6eqqt8Axm/X30c9cWYAAAAASUVORK5CYII=";

    this.options = {
      snowflakeCount: options.snowflakeCount || 150,
      sizeRange: options.sizeRange || [8, 16],
      animationDurationRange: options.animationDurationRange || [25, 50], // seconds
      container: options.container || document.body,
      snowflakeImage: options.snowflakeImage || defaultSnowflake,
    };
    this.snowflakes = [];
    this.init();
  }

  createStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
            @keyframes fall {
              0% {
                transform: translateY(0);
                opacity: 1;
              }
              70% {
                opacity: 1;
              }
              100% {
                transform: translateY(100vh);
                opacity: 0;
              }
            }
      
            @keyframes rotate {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
      
            .snowflake {
              position: fixed;
              top: -100;
              left: 0;
              pointer-events: none;
              will-change: transform, opacity;
              animation: fall linear infinite;
            }
          `;
    document.head.appendChild(style);
  }

  createSnowflake(id) {
    const size =
      Math.random() * (this.options.sizeRange[1] - this.options.sizeRange[0]) +
      this.options.sizeRange[0];
    const rotate = size > 12;
    const snowflake = document.createElement("div");

    snowflake.classList.add("snowflake");
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.backgroundImage = `url(${this.options.snowflakeImage})`;
    snowflake.style.backgroundSize = "contain";
    snowflake.style.backgroundRepeat = "no-repeat";
    snowflake.style.animationDuration = `${
      Math.random() *
        (this.options.animationDurationRange[1] -
          this.options.animationDurationRange[0]) +
      this.options.animationDurationRange[0]
    }s`;
    snowflake.style.animationDelay = `${Math.random() * -40}s`;
    if (rotate) {
      snowflake.style.animation = `fall linear infinite, rotate ${
        Math.random() * 4 + 6
      }s linear infinite`;
    }

    this.options.container.appendChild(snowflake);
    this.snowflakes.push(snowflake);
  }

  init() {
    this.createStyles();
    for (let i = 0; i < this.options.snowflakeCount; i++) {
      this.createSnowflake(i);
    }
  }

  destroy() {
    this.snowflakes.forEach((snowflake) => snowflake.remove());
    this.snowflakes = [];
  }
}

export default function startSnowfall(options) {
  return new Snowfall(options);
}
