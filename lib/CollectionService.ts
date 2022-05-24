import glob from 'glob';
import matter from 'gray-matter';

/**
 * Markdown Collection
 * */
export default class CollectionService<T> {
  _collectionFilePath: string | undefined;

  /**
   * Returns an array of file paths
   * @param {string} path - The path to the file or folder
   * */
  private _getFiles = (path: string): string[] => {
    return glob.sync(path, 'utf8');
  };

  /**
   * Converts a markdown file to an object
   * @param {string} file - The markdown file path
   * */
  private _getMetaFields = (file: string): T => {
    return matter.read(file, {}).data as T;
  };

  /**
   * Returns a Markdown collection as an array of objects
   * */
  getParsedFiles(): T[] {
    const files = this._getFiles(this._collectionFilePath);

    return files.map((file) => {
      return this._getMetaFields(file);
    });
  }

  constructor(collectionFilePath: string) {
    this._collectionFilePath = collectionFilePath;
    return this;
  }
}
