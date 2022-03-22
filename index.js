const yargs = require("yargs");
const { addNote, printNotes, removeNote } = require("./notes.controller");

yargs.command({
  command: "add",
  name: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  name: "Print all notes",
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: "remove",
  name: "Remove note by id",
  builder: {
    id: {
      type: "string",
      describe: "Note id",
      demandOption: true,
    },
  },
  async handler({ id }) {
    removeNote(id);
  },
});

yargs.parse();
