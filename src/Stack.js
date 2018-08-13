/* eslint-disable no-underscore-dangle */
// declare a symbol to keep the items array private
const _items = Symbol('items');

/**
 * Provides a custom error type for actions
 * attempted on an empty stack. This is a simplified
 * version of a custom error. Instead of extending Error,
 * just create a function, as the transpiled version
 * of native extensions is kind of terrible.
 */
function EmptyStackError() {
  this.name = 'EmptyStackError';
  this.message = 'Attempted an operation on an empty stack';
}

/**
 * Stack provides a Last In First Out (LIFO) data type,
 * commonly known as a Stack.
 */
class Stack {
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
  empty() {
    return !this.size();
  }

  /**
   * Returns the top item on the stack without removing it.
   *
   * @return the top item on the stack
   * @throws EmptyStackError if the stack is empty
   */
  peek() {
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
  pop() {
    if (this.empty()) throw new EmptyStackError();
    return this[_items].pop();
  }

  /**
   * Pushes an item onto the top of the stack
   *
   * @param {*} item the item to push onto the stack
   * @return the item pushed onto the stack
   */
  push(item) {
    this[_items].push(item);
    return item;
  }

  /**
   * Counts the number of items in the stack
   *
   * @return the number of items in the stack
   */
  size() {
    return this[_items].length;
  }
}

export default Stack;
