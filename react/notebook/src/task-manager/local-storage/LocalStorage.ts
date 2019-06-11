class LocalStorage {
  getItem (key: string, json: boolean = false) {
    let localNote = localStorage.getItem(key),
        parseNote: any;

    if (localNote) {
      parseNote = localNote;
      if (json) {
        parseNote = JSON.parse(localNote);
      }
    } else {
      parseNote = null;
    }

    return parseNote;
  }

  setItem (key: string, data: any, json: boolean = false) {
    let note = data;
    if (json) {
      note = JSON.stringify(data);
    }

    localStorage.setItem(key, note);
  }

  removeItem (key: string) {
    localStorage.removeItem(key);
  }
}

export default new LocalStorage();