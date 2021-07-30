# mini-player

A HTML5 music player for Vue3.js  
Inspired by [muhammederdem/mini-player](https://github.com/muhammederdem/mini-player)

![img](https://raw.githubusercontent.com/Qinruiy/mini-player/master/assets/screenhot.png)

## Installation

```bash
npm install mini-player
```

## Usage

```
import MINIPlayer from 'mini-player'
```

Example:

```
<mini-player
  :tracks="[
        {
          name:'Mekanın Sahibi',
          artist:'Norm Ender',
          cover:'img_url',
          source:'source_url',
          url:'original_url',
        },
      ]"
></mini-player>
```

## Option

- name: music name
- artist: music artist
- cover: music cover
- source: music source url
- url: music original url
