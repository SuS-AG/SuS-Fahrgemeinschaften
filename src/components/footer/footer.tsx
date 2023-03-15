import { Box, Text } from "@chakra-ui/react";


export default function Footer() {
  return (
    <Box className="grid min-h-[5.813rem] min-w-full bg-cyan-900 text-center content-center">
      <Box>
        <Text className="text-2xl font-bold text-white">SUS</Text>
        <Text className="text-xs font-extralight text-white">
          Schüler und Schülerinnen
        </Text>
        <Text className="text-xs font-extralight text-white">© SuS AG</Text>
      </Box>
    </Box>
  );
}
