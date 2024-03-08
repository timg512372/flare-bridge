#!/usr/bin/env bash

set -eu

dirs="/appdata/media"

if [[ -z ${USER_UID} ]] | [[ -z ${USER_GID} ]]; then
    # using docker desktop
    exec "$@"
else
    # not using docker desktop
    for d in $dirs; do
        if ! [[ "$(stat -c '%u:%g' $d)" == "$USER_UID:$USER_GID" ]]; then
            chown -R "$USER_UID:$USER_GID" "$d"
        fi
    done

    exec gosu "$USER_UID:$USER_GID" "$@"
fi
