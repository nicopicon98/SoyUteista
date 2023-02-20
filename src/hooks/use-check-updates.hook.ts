import { useState, useEffect } from "react";
import { Platform } from "react-native";
import SpInAppUpdates, { IAUUpdateKind, StartUpdateOptions } from "sp-react-native-in-app-updates";

export const useCheckUpdates = () => {
  const [inAppUpdates, setInAppUpdates] = useState(new SpInAppUpdates(false))

  useEffect(() => {
    const needsUpdate = async () => {
      try {
        const result = await inAppUpdates.checkNeedsUpdate();
        if (result.shouldUpdate) {
          let updateOptions: StartUpdateOptions = {};
          if (Platform.OS === 'android') {
            // android only, on iOS the user will be promped to go to your app store page
            updateOptions = {
              updateType: IAUUpdateKind.FLEXIBLE,
            };
          }
          inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
        }
      } catch (error) {
        console.log('No update needed at the time')
      }
    }
    needsUpdate();
  }, [])

}