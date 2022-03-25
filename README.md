<h1 align="center">Distributed Architecture Project</h1>

> **LE ROY-NIVOT** Mathis, **VERA** Samy, **RIGAUDEAU** Léo

<div align="center">

[![Generic badge](https://img.shields.io/badge/Contributors-3-green.svg)](https://shields.io/) [![MIT license](https://img.shields.io/badge/License-Apache-blue.svg)](https://github.com/MathisLeRoyNivot/big-data-final-project/main/LICENSE)

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

</div>

<hr />

- **[📄 Report [🇫🇷 FR Version]](https://gem-zoo-d8b.notion.site/Architecture-distribu-e-Projet-Fil-Rouge-ed4ea0889c494f29a3d2e2e2d9905940)**
- **[📄 Report [🇬🇧 EN Version]]()**

<hr />

# Table of content

- [Installation](#installation)
- [Contributors](#contributors)

<div id="installation">

# Installation 🔧

First, download the following **[file](https://www.data.gouv.fr/fr/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/)** (named *Sirene : Fichier StockEtablissement du 01 Mars 2022*)

<div align="center">

<a href="https://www.data.gouv.fr/fr/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/">

<img src="./docs/screenshot_data_to_download.png" width=550>

</a>

</div>

</div>

<div id="contributors">

## Contributors :computer:

- [Mathis LE ROY-NIVOT](https://github.com/MathisLeRoyNivot "Go to @MathisLeRoyNivot's Github")
- [Léo RIGAUDEAU](https://github.com/leorigaudeau "Go to @leorigaudeau's Github")
- [Samy VERA](https://github.com/samyvera "Go to @samyvera's Github")


</div>




## Exec Scala

```cmd
spark-shell -i transData.scala --conf spark.driver.codenaf="56.10C"
```