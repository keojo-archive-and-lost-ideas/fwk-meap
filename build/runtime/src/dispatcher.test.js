import { describe, test, expect, vi } from "vitest";
import { Dispatcher } from "./dispatcher";
describe('dispacther', () => {
  test.only('it subscribe to a command', () => {
    const dispacther = new Dispatcher();
    const handler = () => {
      console.log('hello world');
    };
    dispacther.subscribe('log', handler);
    const fetchHandler = dispacther.getHandlers('log');
    const JSONifiedHandler = JSON.stringify(fetchHandler.at(0).toString());
    expect(JSONifiedHandler).toEqual(JSON.stringify(handler.toString()));
  });
  test('it unsubscribe to a command', () => {
    const dispacther = new Dispatcher();
    const handler = () => {
      console.log('hello world');
    };
    const unsubscribe = dispacther.subscribe('log', handler);
    unsubscribe();
    const fetchHandler = dispacther.getHandlers('log');
    expect(fetchHandler).toEqual(undefined);
  });
  test('it subscribe to a afterEveryCommand', () => {
    const dispacther = new Dispatcher();
    const handler = () => {
      console.log('hello world');
    };
    dispacther.afterEveryCommand(handler);
    const fetchHandlers = dispacther.getAfterHandlers();
    const JSONifiedHandlers = fetchHandlers.map(handler => JSON.stringify(handler.toString()));
    expect(JSONifiedHandlers).toContain(() => {
      console.log('hello world');
    });
  });
  test('it unsubscribe to a afterEveryCommand', () => {
    const dispacther = new Dispatcher();
    const handler = () => {
      console.log('hello world');
    };
    const unsubscribe = dispacther.afterEveryCommand(handler);
    unsubscribe();
    const fetchHandler = dispacther.getHandlers('log');
    expect(fetchHandler).toEqual(undefined);
  });
  test('afterEveryCommand is called after every command', () => {
    const dispacther = new Dispatcher();
    dispacther.subscribe('log', str => {
      console.log(str);
    });
    const handler = vi.fn();
    dispacther.afterEveryCommand(handler);
    dispacther.dispatch('log', 'hello world');
    expect(handler).toHaveBeenCalledOnce();
  });
});