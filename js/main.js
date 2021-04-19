class Figure {
	constructor(state) {
		this.color = state.color;
		this.x = state.x;
		this.y = state.y;
		this.createFigure(state.type);
		this.render();
	}
 
	createFigure(type) {
		switch (type) {
			case 1: {
				this.name = "pawn";
				if (this.color == "black") {
					this.movePositions = [[{x: 0, y: 1}, {x: 0, y: 2}]];
					this.attackPositions = [[{x: 1, y: 1}], [{x: -1, y: 1}]];
				} else {
					this.movePositions = [[{x: 0, y: -1}, {x: 0, y: -2}]];
					this.attackPositions = [[{x: 1, y: -1}], [{x: -1, y: -1}]];
				}
				break;
			}
			case 2: {
				this.name = "rook";
				this.movePositions = [[], [], [], []];
				for (let i = 1; i < 8; i++) {
					this.movePositions[0].push({x: i, y: 0});
					this.movePositions[1].push({x: -i, y: 0});
					this.movePositions[2].push({x: 0, y: i});
					this.movePositions[3].push({x: 0, y: -i});
				}
				this.attackPositions = this.movePositions;
				break;
			}
			case 3: {
				this.name = "horse";
				this.movePositions = [[{x: 2, y: 1}], [{x: 2, y: -1}], [{x: -2, y: 1}], [{x: -2, y: -1}], [{x: 1, y: -2}], [{x: 1, y: 2}], [{x: -1, y: -2}], [{x: -1, y: 2}]];
				this.attackPositions = this.movePositions;
				break;
			}
			case 4: {
				this.name = "eleph";
				this.movePositions = [[], [], [], []];
				for (let i = 1; i < 8; i++) {
					this.movePositions[0].push({x: i, y: i});
					this.movePositions[1].push({x: -i, y: i});
					this.movePositions[2].push({x: i, y: -i});
					this.movePositions[3].push({x: -i, y: -i});
				}
				this.attackPositions = this.movePositions;
				break;
			}
			case 5: {
				this.name = "queen";
				this.movePositions = [[], [], [], [], [], [], [], []];
				for (let i = 1; i < 8; i++) {
					this.movePositions[0].push({x: i, y: i});
					this.movePositions[1].push({x: -i, y: i});
					this.movePositions[2].push({x: i, y: -i});
					this.movePositions[3].push({x: -i, y: -i});
					this.movePositions[4].push({x: i, y: 0});
					this.movePositions[5].push({x: -i, y: 0});
					this.movePositions[6].push({x: 0, y: -i});
					this.movePositions[7].push({x: 0, y: i});
				}
				this.attackPositions = this.movePositions;
				break;
			}
			case 6: {
				this.name = "king";
				this.movePositions = [[{x: 0, y: 1}], [{x: 0, y: -1}], [{x: 1, y: 0}], [{x: -1, y: 0}], [{x: 1, y: 1}], [{x: 1, y: -1}], [{x: -1, y: 1}], [{x: -1, y: -1}]]
				this.attackPositions = this.movePositions;
				break;
			}
		}
	}
 
	getPosition() {
		return document.querySelector(`.figure[data-x="${this.x}"][data-y="${this.y}"]`);
	}
 
	render() {
		let position = document.querySelector(`.figure[data-x="${this.x}"][data-y="${this.y}"]`);
		position.classList = ['figure'];
		position.classList.add(`${this.color}`);
		position.classList.add(`${this.name}`);
	}
 
	displayMovePositions(place) {
		let isPawn = this.name == "pawn";

		if (isPawn && (((this.color == "black" && this.y > 1)) || ((this.color == "white" && this.y < 6)))) {
			let x = Number(this.x) + Number(this.movePositions[0][0].x);
			let y = Number(this.y) + Number(this.movePositions[0][0].y);
			if (x < 8 && x >= 0 && y < 8 && y >= 0) {
				let IS_EMPTY = place[y][x] == 0;
				if (IS_EMPTY) {
					document.querySelector(`.figure[data-x="${x}"][data-y="${y}"]`).classList.add('displayPosition');
				}
			}
		} else {
			for (let i = 0; i < this.movePositions.length; i++) {
				for (let j = 0; j < this.movePositions[i].length; j++) {
					let currentElement = this.movePositions[i][j];
					let x = Number(this.x) + Number(currentElement.x);
					let y = Number(this.y) + Number(currentElement.y);
					if (x < 8 && x >= 0 && y < 8 && y >= 0) {
						let IS_EMPTY = place[y][x] == 0;
						if (IS_EMPTY) {
							document.querySelector(`.figure[data-x="${x}"][data-y="${y}"]`).classList.add('displayPosition');
						} else {
							break;
						}
					}
				}
			}
		}
 
		for (let i = 0; i < this.attackPositions.length; i++) {
			for (let j = 0; j < this.attackPositions[i].length; j++) {
				let currentElement = this.attackPositions[i][j];
				let x = Number(this.x) + Number(currentElement.x);
				let y = Number(this.y) + Number(currentElement.y);
				if (x < 8 && x >= 0 && y < 8 && y >= 0) {
					let IS_EMPTY = place[y][x] == 0;
					if (!IS_EMPTY) {
						document.querySelector(`.figure[data-x="${x}"][data-y="${y}"]`).classList.add('displayAttackPosition');
						break;
					}
				}
			}
		}
	}	
 
	move(x, y) {
		this.x = x;
		this.y = y;
		this.render();
	}
}
 
class Place {
	constructor() {
		this.CURRENT_MOVE = 1;
 
		this.objects = [];
		this.current = {
			x: -1,
			y: -1
		};
		for (let i = 0; i < 8; i++) {
			let tempObject = [];
			for (let j = 0; j < 8; j++) {
				tempObject.push(0);
			}
			this.objects.push(tempObject);
		}
		this.createDefaultPositions();
		this.createDefaultFigures();
 
		document.querySelectorAll(`.figure`).forEach((element) => {
			element.addEventListener("click", this.handlerClickFigure.bind(this));
		});
	}
 
	handlerClickFigure(event) {
		let isFigureBlack = event.target.classList.contains('black');
		let isFigureWhite = event.target.classList.contains('white');
		if (isFigureWhite || isFigureBlack) {
			let x = event.target.dataset.x;
			let y = event.target.dataset.y;
 
			let isFigureAttack = event.target.classList.contains('displayAttackPosition');
			if (isFigureAttack) {
				this.objects[this.current.y][this.current.x].move(x, y);
				this.attackFigure({x: x, y: y});
				this.clearCurrentMovePosition();
				this.clearDisplayAttackPosition();
				this.getPosition().classList = ["figure"];
				this.current = {
					x: x,
					y: y
				};
				this.nextMove();
				return;
			}
			if (this.CURRENT_MOVE != isFigureWhite) return;
 
			if (this.current.x != -1) {
				this.objects[this.current.y][this.current.x].getPosition().classList.remove('current');
			}
			this.clearCurrentMovePosition();
			this.clearDisplayAttackPosition();
			this.current = {
				x: x,
				y: y
			};
			this.objects[y][x].getPosition().classList.add('current');
			this.objects[y][x].displayMovePositions(this.objects);
 
			document.querySelectorAll('.displayAttackPosition').forEach((element) => {
				let currentFigureBlack = element.classList.contains('black');
				if (isFigureBlack == currentFigureBlack) element.classList.remove('displayAttackPosition');
			});
			return;
		}
 
		let isMovePosition = event.target.classList.contains('displayPosition');
		if (isMovePosition) {
			let newX = event.target.dataset.x;
			let newY = event.target.dataset.y;
			this.objects[this.current.y][this.current.x].move(newX, newY);
			this.swap(this.current, {x: newX, y: newY});
			document.querySelector(`.figure[data-x="${this.current.x}"][data-y="${this.current.y}"`).classList = ["figure"];
			this.current = {x: newX, y: newY};
			this.clearCurrentMovePosition();
			this.clearDisplayAttackPosition();
			this.nextMove();
			if (this.current.y == 0 || this.current.y == 7) {
				let isPawn = event.target.classList.contains('pawn');
				if (isPawn) {
					this.objects[this.current.y][this.current.x] = new Figure({type: 5, color: event.target.classList[1], x: Number(this.current.x), y: Number(this.current.y)});
				}
			}
			this.isCheck(this.CURRENT_MOVE);
		}
 
	}
 
	swap(firstObject, secondObject) {
		[this.objects[firstObject.y][firstObject.x], this.objects[secondObject.y][secondObject.x]] = [this.objects[secondObject.y][secondObject.x], this.objects[firstObject.y][firstObject.x]];
	}
 
	createDefaultFigures() {
		for (let i = 0; i < 8; i++) {
			this.objects[1][i] = new Figure({type: 1, color: "black", x: i, y: 1});
			this.objects[6][i] = new Figure({type: 1, color: "white", x: i, y: 6});
		}
 
		for (let i = 0; i < 2; i++) {
			this.objects[0][i * 7] = new Figure({type: 2, color: "black", x: i * 7, y: 0});
			this.objects[7][i * 7] = new Figure({type: 2, color: "white", x: i * 7, y: 7});
			this.objects[0][i * 5 + 1] = new Figure({type: 3, color: "black", x: i * 5 + 1, y: 0});
			this.objects[7][i * 5 + 1] = new Figure({type: 3, color: "white", x: i * 5 + 1, y: 7});
			this.objects[0][i * 3 + 2] = new Figure({type: 4, color: "black", x: i * 3 + 2, y: 0});
			this.objects[7][i * 3 + 2] = new Figure({type: 4, color: "white", x: i * 3 + 2, y: 7});
		}
		this.objects[0][3] = new Figure({type: 5, color: "black", x: 3, y: 0});
		this.objects[7][3] = new Figure({type: 5, color: "white", x: 3, y: 7});
		this.objects[0][4] = new Figure({type: 6, color: "black", x: 4, y: 0});
		this.objects[7][4] = new Figure({type: 6, color: "white", x: 4, y: 7});
	}
 
	createDefaultPositions() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				document.querySelector('.place').insertAdjacentHTML('beforeend', `<div class="figure" data-x="${j}" data-y="${i}"></div>`);
			}
		}
	}
 
	clearCurrentMovePosition() {
		document.querySelectorAll(`.figure.displayPosition`).forEach((element) => {
			element.classList.remove('displayPosition');
		})
	}
 
	clearDisplayAttackPosition() {
		document.querySelectorAll(`.figure.displayAttackPosition`).forEach((element) => {
			element.classList.remove('displayAttackPosition');
		});
	}
 
	attackFigure(attackFigure) {
		if (this.objects[attackFigure.y][attackFigure.x].name == "king") {
			this.end(this.objects[attackFigure.y][attackFigure.x].color);
		}
		[this.objects[this.current.y][this.current.x], this.objects[attackFigure.y][attackFigure.x]] = [0, this.objects[this.current.y][this.current.x]];
	}
 
	render() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.objects[i][j] != 0) this.objects[i][j].render();
			}
		}
	}

	isCheck(color) {
		if (color) color = "black";
		else color = "white";
		document.querySelectorAll(`.figure.${color}`).forEach((element) => {
			let x = element.dataset.x;
			let y = element.dataset.y;
			let currentFigure = this.objects[y][x];
			for (let i = 0; i < currentFigure.attackPositions.length; i++) {
				for (let j = 0; j < currentFigure.attackPositions[i].length; j++) {
					let currentElement = currentFigure.attackPositions[i][j];
					let newX = Number(x) + Number(currentElement.x);
					let newY = Number(y) + Number(currentElement.y);
					if (newX < 8 && newX >= 0 && newY < 8 && newY >= 0) {
						let IS_EMPTY = this.objects[newY][newX] == 0;
						if (!IS_EMPTY) {
							if (this.objects[newY][newX].name == "king" && this.objects[newY][newX].color != color) {
								document.querySelector('.checkTarget').classList.add('active');
								setTimeout(() => {
									document.querySelector('.checkTarget').classList.remove('active');
								}, 5000);
							}
							break;
						}
					}
				}
			}
		});
	}
 
	nextMove() {
		this.CURRENT_MOVE++;
		this.CURRENT_MOVE %= 2;
	}
 
	getPosition(x = this.current.x, y = this.current.y) {
		return document.querySelector(`.figure[data-x="${x}"][data-y="${y}"]`);
	}
 
	end(color) {
		setTimeout(() => {
			document.querySelector('.dashboard').classList.add("active");
			document.querySelector('body').classList.add('end');
		}, 700);
		document.querySelector('.dashboard').innerHTML = `${color}, you died..`;
		document.querySelector('.place').classList.add('grey');
	}
}
 
let place = new Place();
 
place.render();