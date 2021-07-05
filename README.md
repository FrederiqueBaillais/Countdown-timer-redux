# WorkShop_Redux

Nous allons vous présenter Redux, qui travaille avec React.

## Plan de travail

* Introduction
  * Explications
  * Historique
  * Contexte
* Installation
  * Toutes les commandes terminal
* Projet
  * Repo dévoilé au fur et à mesure

## Qui a travaillé sur ce workshop ?

[Laura Vilain](https://github.com/Laura-VLN), [Loïc Hannecart](https://github.com/HanLoi) et [Frédérique Baillais](https://github.com/FrederiqueBaillais)

## Pour commencer

Premièrement, nous devons écrire l'application et sa logique. Et dans notre cas, nous avons d'abord fait toute l'application en utilisant des états primitifs (sans utiliser Redux), juste pour mieux comprendre son fonctionnement. Et puis nous avons converti notre gestion d'état en utilisant Redux.

Donc, pour commencer, nous avons téléchargé le code d'état primitif dans la branche ```react```. L'application que nous allons monter en utilisant Redux se trouve dans une branche distincte que nous vous dévoilerons par la suite. Pour commencer, vous pouvez cloner la branche ```react``` et nous allons vous expliquer ce qui suit pour ajouter la gestion de l'état Redux à notre application.

```git clone git@github.com:FrederiqueBaillais/WorkShop_Redux.git```

**Remarque :** Pour ce workshop, nous allons nous concentrer uniquement sur la mise en œuvre de Redux et non sur la création de l'ensemble de l'application à partir de zéro. Donc, il est préférable de parcourir les principaux composants pour au moins savoir quelle fonction fait quoi. Ce sera plus facile de suivre ;-)

## Travail de base

Toutes les fonctionnalités dont nous avons besoin se produisent en cliquant sur un bouton, nous devons donc transmettre une fonction de "gestionnaire au clic" à chacun de nos composants ```Button``` personnalisés en utilisant la propriété réservée ```clicked```.

```javascript
<Button clicked={this.incTimer}>+</Button>
<Button clicked={this.startTimer}>Start</Button>
<Button clicked={this.stopTimer}>Stop</Button>
<Button clicked={this.resetTimer}>Reset</Button>
<Button clicked={this.decTimer}>-</Button>
```

Si vous vous demandez quel est le composant ```Button```, voici un aperçu de cela :

```javascript
function Button(props) {
    return <button onClick={props.clicked}>{props.children}</button>;
}
```

## Conception du Store

D'après nos connaissances Redux précédentes, nous savons que l'ensemble de notre application doit disposer d'un store global qui stockera toutes les données d'état. Choisissons donc la structure de notre store.

Tout d'abord, nous créerons un dossier ```store``` dans le répertoire racine, pour contenir les actions et les réducteurs nécessaires.

Maintenant, si vous regardez l'état de notre application prête à l'emploi dans la branche ```react```, c'est :

```javascript
this.state = { time: { h: 0, m: 0, s: 0 }, seconds: 0};
```

Nous pouvons ici en créer un ```reducers``` dans notre dossier ```store```, à savoir ```timer.js```. En outre, nous le conserverons dans un dossier nommé ```reducers``` situé dans notre dossier ```store```.

## Création de notre Store

C'est là que nous commençons à utiliser Redux. Tout d'abord, nous devons installer les packages requis, à savoir :

* Redux - pour la gestion de l'état
* React-Redux - pour connecter Redux à notre application React

```npm install redux react-redux``` ou alors ```yarn add redux react-redux```

Maintenant, dans ```index.js``` de notre application, nous devons créer l'objet store et le transmettre à ses composants enfants.

Nous allons d'abord les importer dans ```index.js``` :

```javascript
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
```

Nous ajouterons également nos réducteurs à partir du dossier des réducteurs :

```javascript
import timerReducer from "./store/reducers/timer";
```

Maintenant, comme nous avons deux réducteurs différents, nous allons utiliser la fonction ```combineReducers``` pour les combiner et créer un fichier ```rootReducer```. Après quoi, nous pourrons créer un store en passant ceci dans la fonction ```createStore```.

```javascript
const rootReducer = combineReducers({
    tmr: timerReducer
});

const store = createStore(rootReducer);
```

**Remarque :** Le ```combineReducers``` va stocker le réducteur ```timer``` dans la propriété d'objet ```tmr``` mais vous pouvez les nommer comme vous voulez.

Enfin, et c'est le plus important, nous devons transmettre le store à tous les composants enfants pour qu'ils puissent y accéder localement. Nous pouvons le faire à travers le package ```Provider``` que nous avons inclus depuis le package ```react-redux```.

```javascript
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
```

Vous pouvez parfois visiter la branche ```redux``` sur GitHub pour voir le code, si vous êtes bloqué quelque part.

## Créer toutes les actions

Comme nous le savons, c'est une bonne pratique d'affecter des variables à la propriété ```type``` de l'objet action plutôt que de fournir des chaînes directement, nous allons donc créer un fichier appelé ```actions.js``` à l'intérieur du dossier nommé ```/store``` pour avoir tous les types d'action.

```javascript
// actions.js

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const COUNTDOWN = "COUNTDOWN";
export const COUNTDOWNATZERO = "COUNTDOWNATZERO";
export const RESET = "RESET";
```

Vous pouvez visiter la branche ```redux2``` sur GitHub pour voir le code, si vous êtes bloqué quelque part.

## Connexion avec le composant Timer

Nous allons travailler sur le composant ```timer.js```. Nous devons d'abord importer les variables et les fonctions nécessaires.

```javascript
import { connect } from "react-redux";

import {
    INCREMENT,
    DECREMENT,
    COUNTDOWN,
    COUNTDOWNATZERO,
    RESET,
} from "../../store/actions";
```

Donc, maintenant si vous regardez attentivement le code, vous remarquerez dans chaque fonction attachée à ces boutons, il y a un appel à ```this.setState``` qui mute notre état local et re-rend notre composant. C'est ce que nous devons changer en utilisant Redux.

La prochaine chose que nous devrions faire est de descendre ```export default Timer``` et d'encapsuler le ```Timer```dans la fonction ```connect``` que nous venons d'importer.

```export default connect(mapStateToProps, mapDispatchToProps)(Timer);```

Attends, mais c'est quoi ```mapStateToPropset``` et ```mapDispatchToProps``` ? Ce ne sont des fonctions que nous allons bientôt définir. Nous y reviendrons une fois que nous aurons fini de fabriquer nos réducteurs. Une chose à la fois.

## Création des réducteurs

Enfin, il est temps de créer nos réducteurs qui passeront l'état mis à jour à l'objet store, ce qui conduira notre composant à re-rendre et à nous montrer la nouvelle heure. Comme vous avez déjà créé un fichier ```timer.js```, vous pouvez vous lancer directement.

## Création du réducteur ```timer.js```

Tout d'abord, importons nos variables d'action au-dessus de la structure du fichier.

```javascript
import {
    INCREMENT,
    DECREMENT,
    COUNTDOWN,
    COUNTDOWNATZERO,
    RESET,
} from "../actions";
```

Maintenant, créons un ```initialState``` qui contiendra l'état requis pour commencer notre application.

```const initialState = { time: { h: 0, m: 0, s: 0 }, seconds: 0 };```

Maintenant nous allons créer la fonction ```reducer```. Nous vous suggèrons de revoir comment l'état est modifié (en utilisant ```this.setState()```) dans chacune des fonctions que nous avons passées au gestionnaire ```onClick``` du composant ```Button```. Cela vous donnera également une compréhension claire de notre fonction de réducteur.

Cela étant dit et/ou fait, voici à quoi ressemblera le réducteur :

```javascript
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT: // on clicking "+"
            return {
                ...state,
                seconds: state.seconds + 60,
                time: action.secToTime(state.seconds + 60),
            };
        case DECREMENT: // on clicking "-"
            return {
                ...state,
                seconds: state.seconds - 60,
                time: action.secToTime(state.seconds - 60),
            };
        case COUNTDOWN: // after clicking "start"
            return {
                ...state,
                seconds: state.seconds - 1,
                time: action.secToTime(state.seconds - 1),
            };
        case COUNTDOWNATZERO: // after clicking "start" but when time becomes 0
            return {
                ...state,
                seconds: 0,
                time: { h: 0, m: 0, s: 0 },
            };
        case RESET: // on clicking "reset"
            return {
                ...state,
                time: { h: 0, m: 0, s: 0 },
                seconds: 0,
            };
        default:
            return state;
    }
};

export default reducer;
```

**Remarque :** Nous passons ```secToTime()``` de nombreuses fois en tant que fonction dans notre objet action, c'est parce que nous avons toujours besoin de cette fonction pour nous donner le format d'heure exact, en entrant simplement des secondes.

Vous pouvez visiter la branche ```redux3``` sur GitHub pour voir le code, si vous êtes bloqué quelque part.

## Comment réduire et stocker à partir d'un composant ?

```mapStateToProps```

Il s'agit d'une fonction qui fonctionne en sous-jacent pour nous donner accès à l'état global de notre composant, qui peut ensuite être consulté en tant qu'accessoires dans notre composant.

```javascript
const mapStateToProps = (state) => {
    return {
        time: state.tmr.time,
        seconds: state.tmr.seconds
    };
};
```

Maintenant, comment devons-nous accéder à la propriété ```tmr``` à l'intérieur du ```state```? C'est parce que nous avons combiné notre routeur, ```timer.js``` dans notre fichier ```index.js``` en utilisant ```combineReducers``` (dans l'éventualité d'un autre réducteur à combiner) et nous avons donné ce nom dans notre fichier ```index```. Cela nous donnera la juste valeur de notre état.

```mapDispatchToProps```

Si vous vous demandiez comment passer les actions de notre composant au réducteur, c'est ce que fait cette fonction ```mapDispatchToProps```. Cela renvoie un tas de fonctions à l'intérieur d'un objet, qui, lorsqu'elles sont appelées, envoient l'action particulière que nous avons écrite pour lui. 

```javascript
const mapDispatchToProps = (dispatch) => {
    return {
        onIncrement: (fn) => dispatch({ type: INCREMENT, secToTime: fn }),
        onDecrement: (fn) => dispatch({ type: DECREMENT, secToTime: fn }),
        onCountDown: (fn) => dispatch({ type: COUNTDOWN, secToTime: fn }),
        onCountDownAtZero: () => dispatch({ type: COUNTDOWNATZERO }),
        onReset: () => dispatch({ type: RESET })
    };
};
```

Ainsi, nous pouvons maintenant accéder à ces fonctions ```props``` dans notre composant et nous allons les appeler chaque fois que nous avons besoin de changement d'état.

## Comment accéder au magasin depuis n'importe quel composant ?

La fonction ```mapStateToProps``` nous donne accès au store global via des accessoires.

Ci-dessus, nous pouvons voir que cette fonction renvoie trois propriétés, à savoir ```time``` et ```seconds```. Nous pouvons y accéder où nous voulons en faisant simplement ```this.props.time``` et ```this.props.seconds```.

## Répartir des actions au lieu d'utiliser ```this.setState()```

Nous avons déjà accès à tous les répartiteurs d'actions et à l'état global de notre composant via les accessoires, en utilisant les fonctions ```mapStateToProps``` et ```mapDispatchToProps```. Maintenant, il nous suffit de remplacer notre ```this.setState()``` par l'envoi des actions requises.


Quand on clique dessus, il y a une fonction ```this.incTimer``` qui s'exécute, comme ceci :

```javascript
incTimer() {
        if (this.state.seconds >= 0) {
            this.setState((prevState) => ({
                seconds: prevState.seconds + 60,
                time: this.secondsToTime(prevState.seconds + 60),
            }));
                }
}
```

Nous devons remplacer cela par l'appel de notre fonction de répartition d'action : ```onIncrement``` qui est définie dans notre fonction ```mapDispatchToProps``` et disponible via ```this.props```.

Voici notre nouvelle fonction ```incTimer``` :

```javascript
incTimer() {
        if (this.props.seconds >= 0) {
            this.props.onIncrement(this.secondsToTime);
        }
}
```

Cela fait exactement la même chose que nous faisions auparavant, avec notre état local.

## Voici le reste des gestionnaires de clics.

```javascript
decTimer() {
        // Runs only if seconds > 61, to not result in getting -ve values rendered
        if (this.props.seconds > 61) this.props.onDecrement(this.secondsToTime);
    }

    startTimer() {
        // Runs only if timer isn't started already and seconds are atleast more than zero
        if (this.timer === 0 && this.props.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Removing a sec and setting state to re-render
        this.props.onCountDown(this.secondsToTime);

        // Check if we're at zero
        if (this.props.seconds === 0) {
            clearInterval(this.timer);
            this.props.onCountDownAtZero();
        }
    }

    stopTimer() {
        // Stop only if timer is running and seconds aren't zero already
        if (this.timer !== 0 && this.props.seconds !== 0) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    }

    resetTimer() {
        // Getting back state to its original form
        this.props.onReset();

        // Also, if timer is running, we've to stop it too
        if (this.timer !== 0) {
            clearInterval(this.timer);fn
            this.timer = 0;
        }
    }
```

Cela va maintenant configurer nos actions à envoyer chaque fois que l'utilisateur clique sur l'un des boutons, ce qui l'amènera au réducteur et après avoir mis à jour l'objet d'état, il passera au store global et nous retournera l'état mis à jour.

## Rendu du composant de minuterie

Maintenant, qu'en est-il de la méthode ```render()``` ? Elle doit également avoir accès à notre état local afin d'afficher la minuterie actuelle, en utilisant ```this.timeFormatter```.

Nous devons donc remplacer le code ci-dessous de notre méthode ```render()``` pour accéder directement au store, au lieu d'appeler ```this.state```.

```javascript
let { h, m, s } = this.timeFormatter(this.state.time);
```

Vous souvenez-vous comment sommes-nous censés accéder à notre store ?
Comme nous avons déjà mappé notre état sur les accessoires, nous pouvons facilement y accéder comme ceci.

```javascript
this.props.time
this.props.seconds
```

Faisons juste cela.

```javascript
let { h, m, s } = this.timeFormatter(this.props.time);
```

Maintenant, nous pouvons facilement afficher les données de notre store global dans notre méthode ```render()```, ce qui fait que notre application fonctionne parfaitement. Vous pouvez maintenant exécuter votre serveur à l'aide de ```npm run start``` ou ```yarn start``` pour voir comment fonctionne votre compte à rebours.

Nous espèrons que c'était une construction amusante.

Vous pouvez visiter la branche ```redux4``` sur GitHub pour voir le code, si vous êtes bloqué quelque part.

