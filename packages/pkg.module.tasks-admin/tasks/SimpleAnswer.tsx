import { forwardRef, useImperativeHandle } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
  useFieldArray,
} from '@xipkg/form';
import { Plus, Italic } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { FileUploader } from '@xipkg/fileuploader';
import { Input } from '@xipkg/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@xipkg/select';
import { Checkbox } from '@xipkg/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@xipkg/tooltip';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { answerModes, hint } from '../consts';
import { HeaderTask } from '../components/HeaderTask';
import { SimpleAnswerRef, SimpleAnswerData } from '../typesTask';

type SimpleAnswerProps = {
  index: number;
  moveTaskUp: () => void;
  moveTaskDown: () => void;
  moveTaskToStart: () => void;
  moveTaskToEnd: () => void;
  deleteTask: () => void;
  isFirst: boolean;
  isLast: boolean;
};

const FormSchema = z.object({
  question: z.string().min(1, 'Пожалуйста, введите текст вопроса'),
  answers: z.array(
    z.object({
      answerType: z.string(),
      answer: z.string(),
      isCaseSensitive: z.boolean(),
    }),
  ),
});

export const SimpleAnswer = forwardRef<SimpleAnswerRef, SimpleAnswerProps>(
  (
    {
      index,
      moveTaskUp,
      moveTaskDown,
      moveTaskToStart,
      moveTaskToEnd,
      deleteTask,
      isFirst,
      isLast,
    },
    ref,
  ) => {
    const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        question: '',
        answers: [{ answerType: 'exact', answer: '', isCaseSensitive: false }],
      },
    });

    const { control, handleSubmit } = form;
    const { fields, append, update } = useFieldArray({
      control,
      name: 'answers',
    });

    const getData = async (): Promise<SimpleAnswerData> =>
      new Promise<SimpleAnswerData>((resolve, reject) => {
        handleSubmit(
          (data) => resolve(data),
          (errors) => reject(errors),
        )();
      });

    useImperativeHandle(ref, () => ({
      getData,
    }));

    return (
      <Form {...form}>
        <form
          onSubmit={handleSubmit(() => {})}
          className="border-gray-10 rounded-2xl border px-6 py-4"
        >
          <HeaderTask
            icon="simple"
            index={index}
            onMoveUp={moveTaskUp}
            onMoveDown={moveTaskDown}
            onMoveToStart={moveTaskToStart}
            onMoveToEnd={moveTaskToEnd}
            onDelete={deleteTask}
            isFirst={isFirst}
            isLast={isLast}
          />

          <p className="text-m-base mt-4 font-medium">Вопрос</p>
          <div className="pb-4 pt-2">
            <FormField
              control={control}
              name="question"
              render={({ field }) => <Input {...field} />}
            />
          </div>

          <FileUploader onChange={() => console.log('file upload')} size="small" accept="image/*" />

          {fields.map((field, index) => (
            <div key={field.id} className={`${index === 0 ? 'mt-12' : 'mt-6'} flex flex-col`}>
              <div className="flex items-end">
                <p className="text-m-base font-medium">Правильный ответ</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-gray-60 ml-2 rounded-full">
                        <Italic size="s" className="bg-gray-0" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      sideOffset={5}
                      className="max-w-80 whitespace-normal break-words"
                    >
                      {hint}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="mt-2 flex items-center">
                <div className="w-[150px]">
                  <FormField
                    control={control}
                    name={`answers.${index}.answerType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value || 'exact'}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Вариант" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(answerModes).map(([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="ml-2 w-full">
                  <FormField
                    control={control}
                    name={`answers.${index}.answer`}
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
              </div>
              <div className="mt-4">
                <FormField
                  control={control}
                  name={`answers.${index}.isCaseSensitive`}
                  render={({ field }) => (
                    <Checkbox
                      size="m"
                      checked={field.value}
                      onCheckedChange={() =>
                        update(index, {
                          ...fields[index],
                          isCaseSensitive: !fields[index].isCaseSensitive,
                        })
                      }
                    >
                      Не учитывать регистр
                    </Checkbox>
                  )}
                />
              </div>
            </div>
          ))}

          <Button
            size="s"
            className="mt-4"
            variant="secondary"
            onClick={() => append({ answerType: '', answer: '', isCaseSensitive: false })}
          >
            <Plus size="s" className="fill-gray-100" />
            <span className="ml-1">Добавить вариант ответа</span>
          </Button>
        </form>
      </Form>
    );
  },
);

SimpleAnswer.displayName = 'SimpleAnswer';
