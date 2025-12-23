---
release:  {{ replace .Name "-" " " | title }}
location: /documentation/{{ replace .Name "-" " " | title }}
release_date: {{ .Date }}
release_notes: https://github.com/percona/everest-doc/releases/tag/v{{ replace .Name "-" " " | title }}
---