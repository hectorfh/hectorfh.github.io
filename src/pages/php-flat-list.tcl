source bin/page.tcl

t { PHP flat list with head recursion }

code {

    /**
     * Flat array.
     * flat([[1, 2], 3, [4, [5, 6]]]) = [1, 2, 3, 4, 5, 6]
     *
     * @param $input
     * @return array
     */
    public static function flat($input)
    {
        return (
            is_array($input) && count($input) ?
                array_merge(
                    self::flat($input[0]),
                    (
                        count($input) === 1 ?
                            []
                        :
                            self::flat(array_slice($input, 1, count($input) - 1)))
                    )
            :
                $input
        );
    }

}

end pages/bezier-intro.html
