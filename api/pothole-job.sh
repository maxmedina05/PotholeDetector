#!/bin/bash
node /home/shiro/projects/pucmm/pothole-project/pothole-detector-api/api/cronjob.js > /home/shiro/logs/pothole-detector.log
echo "Pothole Detector Cronjob Running!" >> /home/shiro/logs/pothole-detector.log
date >> /home/shiro/logs/pothole-detector.log
