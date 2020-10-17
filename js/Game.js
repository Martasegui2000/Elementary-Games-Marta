class Game {

  constructor(id, name, developer, release, genre, pegi) {
    this.id = id;
    this.name = name;
    this.developer = developer;
    this.release = release;
    this.genre = genre;
    this.pegi = pegi;
  }

  toString(){
    return `id:${this.id} - name:${this.name} - developer: ${this.developer}`;
  }

}
export default Game;