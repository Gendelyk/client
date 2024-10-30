type ErrorsMapped<Type extends object> = {
  [key in keyof Type]: string;
};

type ErrorsGeneral = {
  [key: string]: string;
  root: string;
};

export class ErrorOutput<Fields extends object = object> {
  errors!: Partial<ErrorsGeneral & ErrorsMapped<Fields>>;
}
