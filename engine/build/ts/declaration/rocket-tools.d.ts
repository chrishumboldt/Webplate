/**
@author Chris Humboldt
**/

declare module MRocket {
   // Arrays
   interface _Array {
      clean(array: any[]): any[];
      make(values: any, unique?: boolean): any[];
      unique(array: any[]): any[];
   }

   // Basic Checks
   interface _Has {
      class(elm: any, className: string);
      extension(file: string, types?: string[]): boolean;
      spaces(check: any): boolean;
   }

   interface _Is {
      array(check: any): boolean;
      boolean(check: any): boolean;
      browser(): boolean;
      colour(check: string): boolean;
      date(check: any, regExp?: any): boolean;
      element(check: any): boolean;
      email(check: string, regExp?: any): boolean;
      function(check: string): boolean;
      image(check: string, types?: string[]): boolean;
      integer(check: any): boolean;
      json(check: any): boolean;
      number(check: any): boolean;
      object(check: any): boolean;
      password(check: string, regExp?: any): boolean;
      string(check: any): boolean;
      time(check: string, regExp?: any): boolean;
      touch(): boolean;
      url(check: string, regExp?: any): boolean;
   }

   // Classes
   interface _Classes {
      add(elms: any, classNames: any);
      clear(elm: any);
      remove(elms: any, classNames: any);
      replace(elm: any, remove: any, add: any);
      toggle(elms: any, classNames: any);
   }

   // Date
   interface _Date {
      basic(date: any, time?: boolean);
      day(date: any, type?: string);
      safe(date: any, time?: boolean);
      month(date: any, type?: string);
      toISO(date: any, fullDate?: any);
      transform(date: any);
      year(date: any, type?: string);
   }

   // Dimensions
   interface _Dimensions {
      height(elm: any): any;
      width(elm: any): any;
   }

   // DOM
   interface _Dom {
      body: any;
      element(sel: string);
      head: any;
      html: any;
      ratio(sel: string, multiplier: number);
      remove(elms: any);
      select(sel: string): any[];
      title: any;
      wallpaper(sel: string);
   }

   // Events
   interface _Events {
      add(elm: any, event: string, func: any);
      remove(elm: any, event: string, func: any);
   }

   // Gets
   interface _Get {
      extension(item: string): string;
      index(elm: any): number;
   }

   // Helpers
   interface _HelperParse {
      json(json: any);
   }
   interface _Helper {
      parse: _HelperParse;
      setDefault(val: any, def: any);
   }

   // ID's
   interface _Id {
      add(elm: any, id: string);
      remove(elm: any, id: string);
   }

   // Inputs
   interface _Input {
      disable(sel: any);
      enable(sel: any);
   }

   // Milliseconds
   interface _Milliseconds {
      hours(int: number): number;
      minutes(int: number): number;
      seconds(int: number): number;
   }

   // Overlay
   interface _Overlay {
      add();
      show();
      hide();
   }

   // Random
   interface _Random {
      integer(max?: number, min?: number): number;
      string(length?: number, text?: boolean): string;
   }

   // Request
   interface _RequestOptions {
      url: string;
      asynch?: boolean;
      data?: any;
      dataForce?: string;
      dataType?: string;
      headers?: string;
      onComplete?: any;
      onError?: any;
      onLoading?: any;
      onStart?: any;
      onSuccess?: any;
      timeout?: number;
      type?: string;
      withCredentials?: boolean;
   }
   interface _Request {
      delete(options: _RequestOptions): any;
      get(options: _RequestOptions): any;
      patch(options: _RequestOptions): any;
      post(options: _RequestOptions): any;
      put(options: _RequestOptions): any;
      run(options: _RequestOptions): any;
   }

   // States
   interface _State {
      add(elm: any, state: string);
      clear(elm);
      toggle(elm: any, state: string);
   }

   // Storage
   interface _Storage {
      add(key: string, value: any);
      clear();
      get(key: string): string;
      remove(key: string);
   }

   // Strings
   interface _StringFormat {
      bytes(bytes: number): string;
   }
   interface _StringLowercase {
      all(str: string): string;
      first(str: string): string;
      last(str: string): string;
   }
   interface _StringRemove {
      first(str: string): string;
      firstAndLast(str: string): string;
      last(str: string): string;
      spaces(str: string): string;
   }
   interface _StringUppercase {
      all(str: string): string;
      first(str: string): string;
      last(str: string): string;
   }
   interface _String {
      format: _StringFormat;
      lowercase: _StringLowercase;
      remove: _StringRemove;
      trim(str: string): string;
      uppercase: _StringUppercase;
   }

   // Time
   interface _Time {
      basic(time: any): string;
      exact(time: any): string;
      full(time: any): string;
      hours(time: any): string;
      minutes(time: any): string;
      seconds(time: any): string;
   }

   // URL
   interface _Url {
      all(): any;
      base(): string;
      current(): string;
      full(): string;
      hash(): string;
      host(): string;
      pathname(): string;
      protocol(): string;
      segments(): string[];
   }

   // Main interface
   export interface Main {
      defaults: any;
      array: _Array;
      exists(check: any): boolean;
      has: _Has;
      is: _Is;
      classes: _Classes;
      clone(item: any);
      date: _Date;
      log(text: any);
      error(text: any);
      dimensions: _Dimensions;
      dom: _Dom;
      event: _Events;
      get: _Get
      helper: _Helper;
      id: _Id;
      input: _Input;
      milliseconds: _Milliseconds;
      overlay: _Overlay;
      random: _Random;
      request: _Request;
      state: _State;
      storage: _Storage;
      string: _String;
      time: _Time;
      url: _Url;
      button: any;
      flicker: any;
      form: any;
      inject: any;
      loader: any;
      menu: any;
      message: any;
      modal: any;
      module: any;
      pen: any;
      require: any;
      tab: any;
   }
}

// Declare the module
declare var Rocket: MRocket.Main;
