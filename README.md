# Morphalou Crawler

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)][prettier]

## Why

I was looking for a french ~~dictionary API~~ list of words but couldn't find one for the purpose I was looking for.
In my small research, over the internet, I stumbled on a [comment] saying:

> <https://fr.wiktionary.org> is based on morphalou: a gigantic XML <http://www.cnrtl.fr/lexiques/morphalou/>

However, the link was wrong (ngnix `not found` error, though it is still referenced on the [portal page]) and pointing to a [catalog][morphology] of words and not an API.

But, that's what I was mainly looking for, hence this crawler.

_I also noted that I could actually fetch different dictionary from as its the same behavior, every time._

## How to use

```bash
# Clone
git clone https://github.com/g-ongenae/Morphalou-Crawler.git

cd Morphalou-Crawler/

# Install dependencies
npm install

# Run
npm start
```

[comment]: https://openclassrooms.com/forum/sujet/dictionnaire-francais-api-1#message-92732891
[morphology]: https://cnrtl.fr/morphologie/
[portal page]: https://cnrtl.fr/portail/
[prettier]: https://github.com/prettier/prettier
