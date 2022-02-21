import '../style/app.scss';
import { Game } from './game';
import { shipyard } from './shipyard';

Game.renderNewGame();

shipyard.registerDragListeners();
shipyard.registerDropListeners();
