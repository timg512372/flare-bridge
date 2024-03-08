#!/usr/bin/env bash

set -eu

dirs="/appdata/static /appdata/media"

for d in $dirs; do
    if ! [[ "$(stat -c '%u:%g' $d)" == "$USER_UID:$USER_GID" ]]; then
        chown -R "$USER_UID:$USER_GID" "$d"
    fi
done

exec gosu "$USER_UID:$USER_GID" "$@"
