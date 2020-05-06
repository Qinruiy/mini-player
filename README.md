# mini-player

A HTML5 music player for Vue.js  
Thank [muhammederdem/mini-player](https://github.com/muhammederdem/mini-player)
![img](https://raw.githubusercontent.com/Qinruiy/mini-player/master/assets/screenhot.png)

## Installation

```bash
npm install mini-player -S
```

## Usage

```
import MINIPlayer from 'mini-player'
```

Example:

```
<MINIPlayer
  v-bind:tracks="[
        {
          name:'Mekanın Sahibi',
          artist:'Norm Ender',
          cover:'img_url',
          source:'source_url',
          url:'original_url',
        },
      ]"
></MINIPlayer>
```

## Option

- name: music name
- artist: music artist
- cover: music cover
- source: music source url
- url: music original url
