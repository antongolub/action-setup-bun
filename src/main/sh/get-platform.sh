#!/bin/bash

# Adapted from https://bun.sh/install
# https://github.com/Jarred-Sumner/bun

if [ "$OS" = "Windows_NT" ]; then
    echo "error: Please install Bun using Windows Subsystem for Linux."
    exit 1
else
    case $(uname -sm) in
    "Darwin x86_64") target="darwin-x64" ;;
    "Darwin arm64") target="darwin-aarch64" ;;
    *) target="linux-x64" ;;
    esac
fi

if [ "$target" = "darwin-x64" ]; then
    # Is it rosetta
    sysctl sysctl.proc_translated >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        target="darwin-aarch64"
        echo -e "$Dim Your shell is running in Rosetta 2. Downloading Bun for $target instead. $Color_Off"
    fi
fi

echo "$target"
