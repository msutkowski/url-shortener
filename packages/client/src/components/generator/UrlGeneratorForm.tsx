import { Alert, HStack, Box, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormValues = {
  url: string;
};

type Props = {
  onSubmit: (values: FormValues) => void;
};

const urlErrorText =
  "Please enter a url in a format such as https://www.github.com";
const schema = yup.object().shape({
  url: yup.string().url(urlErrorText).required(urlErrorText), // This might be annoying as protocols are enforced, but it makes sense.
});

export const UrlGeneratorForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack spacing={4} flex="auto">
        <Box flex="4">
          <Input
            placeholder="Shorten your link"
            size="lg"
            bg="white"
            {...register("url")}
          />
        </Box>
        <Box flex="auto">
          <Button
            type="submit"
            variant="solid"
            colorScheme="purple"
            size="lg"
            isFullWidth={true}
            isLoading={isSubmitting}
          >
            Shorten
          </Button>
        </Box>
      </HStack>
      {errors.url?.message && (
        <Alert status="warning" borderRadius={4} mt={4}>
          {errors.url && errors.url.message}
        </Alert>
      )}
    </form>
  );
};

export default UrlGeneratorForm;
