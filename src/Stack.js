// @flow
/* eslint-disable no-underscore-dangle */
import type { IndexableClass } from './flowTypes';

// declare a symbol to keep the items array private
const _items = Symbol('items');

/**
 * Provides a custom error type for actions
 * attempted on an empty stack
 */
class EmptyStackError extends Error {
  constructor() {
    super();
    this.name = 'EmptyStackError';
    this.message = 'Attempted an operation on an empty stack';
    Object.setPrototypeOf(this, EmptyStackError.prototype);
  }
}

/**
 * Stack provides a Last In First Out (LIFO) data type,
 * commonly known as a Stack.
 */
class Stack implements IndexableClass {
  $key: Symbol;
  $value: any;
  /**
   * Initializes the stack
   */
  constructor() {
    this[_items] = [];
  }

  /**
   * Tests if the stack is empty.
   *
   * @return true if the stack contains no items, false otherwise
   */
  empty(): boolean {
    return !this.size();
  }

  /**
   * Returns the top item on the stack without removing it.
   *
   * @return the top item on the stack
   * @throws EmptyStackError if the stack is empty
   */
  peek(): any {
    if (this.empty()) throw new EmptyStackError();
    return this[_items][this.size() - 1];
  }

  /**
   * Pops an item from the stack and returns it.  The item popped is
   * removed from the Stack.
   *
   * @return the item popped from the stack
   * @throws EmptyStackError if the stack is empty
   */
  pop(): any {
    if (this.empty()) throw new EmptyStackError();
    return this[_items].pop();
  }

  /**
   * Pushes an item onto the top of the stack
   *
   * @param {*} item the item to push onto the stack
   * @return the item pushed onto the stack
   */
  push(item: any): any {
    this[_items].push(item);
    return item;
  }

  /**
   * Counts the number of items in the stack
   *
   * @return the number of items in the stack
   */
  size(): number {
    return this[_items].length;
  }
}

export default Stack;
