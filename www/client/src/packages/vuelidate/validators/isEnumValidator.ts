import { helpers } from 'vuelidate/lib/validators';

const isEnum = enumClass =>
    helpers.withParams(value => !helpers.req(value) || Object.values(enumClass).includes(value));

export default isEnum;
