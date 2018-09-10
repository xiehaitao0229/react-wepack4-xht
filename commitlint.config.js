module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'merge',
        'add',
        'update',
        'delete',
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'revert'
      ]
    ],
    'subject-case': [0, 'never', ['lower-case']]
  }
}