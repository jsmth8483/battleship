import '../style/app.scss';
import { Game } from './game';
import { shipyard } from './shipyard';

Game.run();

shipyard.registerDragListeners();
shipyard.registerDropListeners();
