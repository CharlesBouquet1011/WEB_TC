{{- define "monchart.name" -}}
{{ .Chart.Name }}
{{- end }} #contient toute les infos réutilisées dans les templates

{{- define "monchart.fullname" -}}
{{ .Release.Name }}-{{ .Chart.Name }}
{{- end }}

{{- define "monchart.chart" -}}
{{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}
{{- end }}
